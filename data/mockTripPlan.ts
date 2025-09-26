import { TripPlan } from '../types.ts';

export const MOCK_TRIP_PLAN: TripPlan = {
  tripSummary: "Enjoy a wonderful 3-day luxury getaway to Kish Island! This plan balances relaxation on beautiful beaches with exciting cultural exploration and shopping, all while staying within your budget.",
  flight: {
    airline: "Mahan Air",
    totalPrice: 5400000,
  },
  hotel: {
    name: "Dariush Grand Hotel",
    totalPrice: 9000000,
    nights: 2,
  },
  itinerary: [
    {
      day: 1,
      date: "2024-09-10",
      activities: [
        {
          name: "Arrival and Hotel Check-in",
          time: "Afternoon",
          cost: 0,
          description: "Arrive at Kish International Airport, transfer to the magnificent Dariush Grand Hotel and settle in."
        },
        {
          name: "Marjan Beach Park",
          time: "Evening",
          cost: 0,
          description: "Take a relaxing stroll along the famous coral beaches and enjoy the beautiful sunset views."
        }
      ]
    },
    {
      day: 2,
      date: "2024-09-11",
      activities: [
        {
          name: "Kariz Underground City",
          time: "Morning",
          cost: 150000,
          description: "Explore the fascinating ancient aqueduct of Kariz, a marvel of historical engineering."
        },
        {
          name: "Pardis 2 Mall",
          time: "Afternoon",
          cost: 0,
          description: "Indulge in some retail therapy at one of the island's most popular shopping centers."
        },
        {
          name: "Visit the Greek Ship",
          time: "Evening",
          cost: 50000,
          description: "Witness the iconic Greek Ship at sunset, a perfect photo opportunity."
        }
      ]
    },
    {
      day: 3,
      date: "2024-09-12",
      activities: [
        {
          name: "Dolphin Park",
          time: "Morning",
          cost: 300000,
          description: "Enjoy entertaining shows featuring dolphins and sea lions, a fun activity for everyone."
        },
        {
          name: "Departure",
          time: "Afternoon",
          cost: 0,
          description: "Enjoy a final Kish lunch before heading to the airport for your departure."
        }
      ]
    }
  ],
  costBreakdown: {
    flights: 5400000,
    hotel: 9000000,
    activities: 1000000, // This is a sum of per-person costs for all travelers, adjusted for realism
    total: 15400000,
  }
};
