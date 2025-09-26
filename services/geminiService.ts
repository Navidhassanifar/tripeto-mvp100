import { GoogleGenAI, Type } from "@google/genai";
import { TripPreferences, TripPlan } from '../types.ts';
import { MOCK_FLIGHTS, MOCK_HOTELS, MOCK_ACTIVITIES } from '../data/mockData.ts';

// The execution environment provides the API key via `process.env.API_KEY`.
const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  // This error will trigger if the API_KEY is not available in the execution environment.
  throw new Error("API_KEY environment variable not set. Please ensure it is configured correctly.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });


const getTripDurationInDays = (startDate: string, endDate: string): number => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const diffTime = Math.abs(end.getTime() - start.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays === 0 ? 1 : diffDays;
};

const isPeakSeason = (date: Date): boolean => {
  const month = date.getMonth() + 1; // getMonth() is 0-indexed
  // Example peak season: March (Nowruz) and July/August (Summer holidays)
  return month === 3 || month === 7 || month === 8;
};

const applyPricingAdjustments = <T extends { price: number } | { pricePerNight: number }>(items: T[], startDate: string) => {
  const date = new Date(startDate);
  const peakSeasonMultiplier = isPeakSeason(date) ? 1.25 : 1.0;

  return items.map(item => {
    const basePrice = 'price' in item ? item.price : item.pricePerNight;
    const seasonalPrice = basePrice * peakSeasonMultiplier;
    // Simulate minor real-time fluctuation
    const finalPrice = seasonalPrice * (1 + (Math.random() - 0.5) * 0.1); // +/- 5% fluctuation
    
    if ('price' in item) {
        return { ...item, price: Math.round(finalPrice) };
    } else {
        return { ...item, pricePerNight: Math.round(finalPrice) };
    }
  });
};

const tripPlanSchema = {
  type: Type.OBJECT,
  properties: {
    tripSummary: { type: Type.STRING, description: "A short, engaging summary of the generated trip plan." },
    flight: {
      type: Type.OBJECT,
      properties: {
        airline: { type: Type.STRING },
        totalPrice: { type: Type.NUMBER },
      },
      required: ['airline', 'totalPrice']
    },
    hotel: {
      type: Type.OBJECT,
      properties: {
        name: { type: Type.STRING },
        totalPrice: { type: Type.NUMBER },
        nights: { type: Type.INTEGER },
      },
      required: ['name', 'totalPrice', 'nights']
    },
    itinerary: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          day: { type: Type.INTEGER },
          date: { type: Type.STRING },
          activities: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                name: { type: Type.STRING },
                time: { type: Type.STRING, enum: ['Morning', 'Afternoon', 'Evening'] },
                cost: { type: Type.NUMBER },
                description: { type: Type.STRING },
              },
              required: ['name', 'time', 'cost', 'description']
            }
          }
        },
        required: ['day', 'date', 'activities']
      }
    },
    costBreakdown: {
      type: Type.OBJECT,
      properties: {
        flights: { type: Type.NUMBER },
        hotel: { type: Type.NUMBER },
        activities: { type: Type.NUMBER },
        total: { type: Type.NUMBER },
      },
      required: ['flights', 'hotel', 'activities', 'total']
    }
  },
  required: ['tripSummary', 'flight', 'hotel', 'itinerary', 'costBreakdown']
};

export const generateTripPlan = async (preferences: TripPreferences): Promise<TripPlan> => {
  const durationDays = getTripDurationInDays(preferences.startDate, preferences.endDate);
  
  const adjustedFlights = applyPricingAdjustments(MOCK_FLIGHTS, preferences.startDate);
  const adjustedHotels = applyPricingAdjustments(MOCK_HOTELS, preferences.startDate);
  const adjustedActivities = applyPricingAdjustments(MOCK_ACTIVITIES, preferences.startDate);

  const prompt = `
    System Instruction: You are Tripeto, an expert AI travel planner specializing in creating personalized itineraries for travel within Iran. Your goal is to create a detailed, exciting, and budget-conscious trip plan based on the user's preferences and the data provided. You must adhere strictly to the JSON schema for your response.

    User Prompt:
    Generate a personalized travel plan for Kish Island based on the following criteria:

    User Preferences:
    - Travelers: ${preferences.travelers}
    - Budget: ${preferences.budget.toLocaleString()} Toman (Total for all travelers)
    - Start Date: ${preferences.startDate}
    - End Date: ${preferences.endDate}
    - Duration: ${durationDays} days
    - Interests: ${preferences.interests.join(', ')}

    Available Data (prices are per person/night and already adjusted for season/fluctuation):

    Flights (Round-trip from Tehran, price is per person):
    ${JSON.stringify(adjustedFlights, null, 2)}

    Hotels (Price per night for a room suitable for ${preferences.travelers} people):
    ${JSON.stringify(adjustedHotels, null, 2)}

    Activities (Price per person):
    ${JSON.stringify(adjustedActivities, null, 2)}

    Your task:
    1.  Select ONE round-trip flight from the list. The flight cost in the cost breakdown should be (flight.price * travelers).
    2.  Select ONE hotel for the entire duration of the trip (${durationDays} nights). The total hotel cost should be (hotel.pricePerNight * ${durationDays}).
    3.  Create a day-by-day itinerary for the ${durationDays} days.
    4.  For each day, suggest 2-3 activities from the provided list that align with the user's interests.
    5.  Calculate the total estimated cost, including flights (for all travelers), hotel (total for the room for all nights), and all suggested activities (for all travelers).
    6.  The total cost MUST NOT exceed the user's budget of ${preferences.budget.toLocaleString()} Toman. If you cannot create a plan within budget, prioritize cheaper options. If it's still not possible, state that in the trip summary.
    7.  Provide a short, engaging summary for the trip.
    8.  Return the entire plan in the specified JSON format. Ensure all costs are numbers.
  `;
  
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: tripPlanSchema,
      },
    });
    
    const jsonText = response.text.trim();
    const plan: TripPlan = JSON.parse(jsonText);
    return plan;
  } catch(e) {
      console.error("Error calling Gemini API:", e);
      throw new Error("The AI model could not generate a plan. It might be due to an invalid request or a temporary service issue.");
  }
};