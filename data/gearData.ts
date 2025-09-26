
import { GearOwner, GearItem } from '../types.ts';

export const GEAR_OWNERS: GearOwner[] = [
    {
        id: 'owner-1',
        name: 'Sara',
        avatarUrl: 'https://i.pravatar.cc/150?u=sara',
        rating: 5.0,
    },
    {
        id: 'owner-2',
        name: 'Reza',
        avatarUrl: 'https://i.pravatar.cc/150?u=reza',
        rating: 4.7,
    }
];

export const GEAR_ITEMS: GearItem[] = [
    {
        id: 'gear-1',
        ownerId: 'owner-1',
        title: '2-Person Camping Tent',
        category: 'Camping',
        pricePerDay: 150000,
        location: 'Tehran, Vanak',
        imageUrl: 'https://picsum.photos/seed/tent/400/300'
    },
    {
        id: 'gear-2',
        ownerId: 'owner-2',
        title: 'Professional DSLR Camera',
        category: 'Camera',
        pricePerDay: 450000,
        location: 'Kish Island',
        imageUrl: 'https://picsum.photos/seed/camera/400/300'
    },
    {
        id: 'gear-3',
        ownerId: 'owner-1',
        title: 'Mountain Bike',
        category: 'Bikes',
        pricePerDay: 200000,
        location: 'Tehran, Darband',
        imageUrl: 'https://picsum.photos/seed/bike/400/300'
    },
    {
        id: 'gear-4',
        ownerId: 'owner-2',
        title: 'Inflatable Kayak for Two',
        category: 'Water Sports',
        pricePerDay: 300000,
        location: 'Kish Island',
        imageUrl: 'https://picsum.photos/seed/kayakgear/400/300'
    }
];
