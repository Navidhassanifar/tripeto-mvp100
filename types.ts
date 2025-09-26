
export enum TravelInterest {
  Leisure = 'Leisure',
  Adventure = 'Adventure',
  Luxury = 'Luxury',
  Family = 'Family',
  Shopping = 'Shopping',
  Cultural = 'Cultural',
  Beach = 'Beach'
}

export interface TripPreferences {
  budget: number;
  startDate: string;
  endDate: string;
  travelers: number;
  interests: TravelInterest[];
}

export interface Flight {
  airline: string;
  price: number;
  duration: string;
  from: string;
  to: string;
}

export interface Hotel {
  name: string;
  category: string;
  pricePerNight: number;
}

export interface Activity {
  name: string;
  category: TravelInterest;
  price: number;
  description: string;
}

export interface SelectedFlight {
  airline: string;
  totalPrice: number;
}

export interface SelectedHotel {
  name: string;
  totalPrice: number;
  nights: number;
}

export interface PlannedActivity {
  name: string;
  time: 'Morning' | 'Afternoon' | 'Evening';
  cost: number;
  description: string;
}

export interface DailyPlan {
  day: number;
  date: string;
  activities: PlannedActivity[];
}

export interface CostBreakdown {
  flights: number;
  hotel: number;
  activities: number;
  total: number;
}

export interface TripPlan {
  tripSummary: string;
  flight: SelectedFlight;
  hotel: SelectedHotel;
  itinerary: DailyPlan[];
  costBreakdown: CostBreakdown;
}

// New Types for Marketplaces

export interface Guide {
    id: string;
    name: string;
    avatarUrl: string;
    rating: number;
    bio: string;
    languages: string[];
}

export interface Tour {
    id: string;
    guideId: string;
    title: string;
    location: string;
    category: TravelInterest;
    pricePerPerson: number;
    durationHours: number;
    maxGroupSize: number;
    imageUrl: string;
}

export interface GearOwner {
    id: string;
    name: string;
    avatarUrl: string;
    rating: number;
}

export interface GearItem {
    id: string;
    ownerId: string;
    title: string;
    category: string;
    pricePerDay: number;
    location: string;
    imageUrl: string;
}
