
import { Guide, Tour, TravelInterest } from '../types.ts';

export const GUIDES: Guide[] = [
    {
        id: 'guide-1',
        name: 'Ali',
        avatarUrl: 'https://i.pravatar.cc/150?u=ali',
        rating: 4.9,
        bio: 'Passionate about marine life and the history of the Persian Gulf. Certified diver and local historian.',
        languages: ['Persian', 'English'],
    },
    {
        id: 'guide-2',
        name: 'Fatemeh',
        avatarUrl: 'https://i.pravatar.cc/150?u=fatemeh',
        rating: 4.8,
        bio: 'Food enthusiast and cultural guide. Let me show you the hidden culinary gems and historical sites of Kish.',
        languages: ['Persian', 'Arabic'],
    }
];

export const TOURS: Tour[] = [
    {
        id: 'tour-1',
        guideId: 'guide-1',
        title: 'Kish Island Snorkeling Adventure',
        location: 'Kish Island',
        category: TravelInterest.Adventure,
        pricePerPerson: 800000,
        durationHours: 3,
        maxGroupSize: 6,
        imageUrl: 'https://picsum.photos/seed/snorkeling/400/300',
    },
    {
        id: 'tour-2',
        guideId: 'guide-2',
        title: 'Ancient Kish Cultural Walk',
        location: 'Harireh Ancient City',
        category: TravelInterest.Cultural,
        pricePerPerson: 350000,
        durationHours: 4,
        maxGroupSize: 10,
        imageUrl: 'https://picsum.photos/seed/harireh/400/300',
    },
    {
        id: 'tour-3',
        guideId: 'guide-1',
        title: 'Sunset Kayaking by the Greek Ship',
        location: 'Greek Ship Beach',
        category: TravelInterest.Leisure,
        pricePerPerson: 550000,
        durationHours: 2,
        maxGroupSize: 8,
        imageUrl: 'https://picsum.photos/seed/kayaking/400/300',
    },
    {
        id: 'tour-4',
        guideId: 'guide-2',
        title: 'Kish Bazaar & Food Tour',
        location: 'Kish Island Bazaars',
        category: TravelInterest.Shopping,
        pricePerPerson: 400000,
        durationHours: 3,
        maxGroupSize: 8,
        imageUrl: 'https://picsum.photos/seed/bazaar/400/300',
    }
];
