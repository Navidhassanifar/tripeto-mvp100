
import { Flight, Hotel, Activity, TravelInterest } from '../types.ts';

export const MOCK_FLIGHTS: Omit<Flight, 'from' | 'to' | 'duration'>[] = [
  { airline: 'Iran Air', price: 1200000 },
  { airline: 'Mahan Air', price: 1350000 },
  { airline: 'Kish Air', price: 1100000 },
  { airline: 'Zagros Airlines', price: 1050000 },
];

export const MOCK_HOTELS: Omit<Hotel, 'category'>[] = [
  { name: 'Toranj Marine Hotel', pricePerNight: 5000000 },
  { name: 'Dariush Grand Hotel', pricePerNight: 4500000 },
  { name: 'Shayan Hotel', pricePerNight: 2800000 },
  { name: 'Maryam Sorinet Hotel', pricePerNight: 2200000 },
  { name: 'Parmis Hotel', pricePerNight: 1800000 },
  { name: 'Vida Hotel', pricePerNight: 3500000 },
];

export const MOCK_ACTIVITIES: Activity[] = [
  { name: 'Dolphin Park', category: TravelInterest.Family, price: 300000, description: 'Watch dolphin and sea lion shows.' },
  { name: 'Kariz Underground City', category: TravelInterest.Cultural, price: 150000, description: 'Explore an ancient underground aqueduct.' },
  { name: 'Marjan Beach Park', category: TravelInterest.Beach, price: 0, description: 'Relax on the beautiful coral beaches.' },
  { name: 'Greek Ship', category: TravelInterest.Leisure, price: 50000, description: 'Visit the famous shipwreck at sunset.' },
  { name: 'Scuba Diving', category: TravelInterest.Adventure, price: 800000, description: 'Discover the underwater world of the Persian Gulf.' },
  { name: 'Jet Skiing', category: TravelInterest.Adventure, price: 500000, description: 'Experience high-speed water fun.' },
  { name: 'Morvarid Shopping Center', category: TravelInterest.Shopping, price: 0, description: 'Shop for international brands and souvenirs.' },
  { name: 'Pardis 2 Mall', category: TravelInterest.Shopping, price: 0, description: 'A popular destination for shopping and dining.' },
  { name: 'Harireh Ancient City', category: TravelInterest.Cultural, price: 100000, description: 'Ruins of an 8th-century city.' },
  { name: 'Parasailing', category: TravelInterest.Adventure, price: 600000, description: 'Get a bird\'s eye view of the island from the sky.' },
];