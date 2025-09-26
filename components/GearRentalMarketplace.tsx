
import React, { useMemo, useState } from 'react';
import { GearItem, GearOwner } from '../types.ts';
import { GEAR_ITEMS, GEAR_OWNERS } from '../data/gearData.ts';

interface GearRentalMarketplaceProps {
    onBack: () => void;
}

const StarIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.007z" clipRule="evenodd" />
    </svg>
);

const LocationIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path fillRule="evenodd" d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 005.16-4.212c1.558-2.683.992-6.217-.99-8.396a5.44 5.44 0 00-7.58 0c-1.982 2.179-2.548 5.713-.99 8.396a16.975 16.975 0 005.16 4.212zM12 13.5a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
    </svg>
);


const GearCard: React.FC<{ item: GearItem; owner: GearOwner }> = ({ item, owner }) => {
    return (
        <div className="bg-white rounded-xl shadow-md overflow-hidden transform hover:-translate-y-1 transition-transform duration-300">
            <img className="h-48 w-full object-cover" src={item.imageUrl} alt={item.title} />
            <div className="p-6">
                <p className="text-xs font-semibold text-blue-600 uppercase tracking-wide">{item.category}</p>
                <h3 className="text-xl font-bold text-slate-800 mt-1">{item.title}</h3>
                
                <div className="flex items-center text-sm text-slate-500 mt-2">
                    <LocationIcon className="h-4 w-4 mr-1"/>
                    <span>{item.location}</span>
                </div>

                <div className="flex items-center mt-4">
                    <img className="h-10 w-10 rounded-full" src={owner.avatarUrl} alt={owner.name} />
                    <div className="ml-3">
                        <p className="text-sm font-semibold text-slate-900">{owner.name}</p>
                        <div className="flex items-center">
                            <StarIcon className="h-4 w-4 text-yellow-500" />
                            <p className="text-sm text-slate-600 ml-1">{owner.rating} (Owner rating)</p>
                        </div>
                    </div>
                </div>

                <div className="mt-6 flex justify-between items-center">
                    <p className="text-lg font-bold text-slate-900">{item.pricePerDay.toLocaleString()} <span className="text-sm font-normal text-slate-600">Toman/day</span></p>
                    <button className="bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">Request to Rent</button>
                </div>
            </div>
        </div>
    );
};

const GearRentalMarketplace: React.FC<GearRentalMarketplaceProps> = ({ onBack }) => {
    const [selectedCategory, setSelectedCategory] = useState<string>('All');
    const categories = useMemo(() => ['All', ...new Set(GEAR_ITEMS.map(item => item.category))], []);

    const filteredItems = useMemo(() => {
        if (selectedCategory === 'All') return GEAR_ITEMS;
        return GEAR_ITEMS.filter(item => item.category === selectedCategory);
    }, [selectedCategory]);

    const ownersMap = useMemo(() => {
        return GEAR_OWNERS.reduce((acc, owner) => {
            acc[owner.id] = owner;
            return acc;
        }, {} as Record<string, GearOwner>);
    }, []);

    return (
        <div className="min-h-screen bg-slate-100 p-4 sm:p-6 lg:p-8">
            <div className="max-w-7xl mx-auto">
                <div className="relative text-center mb-8">
                    <button onClick={onBack} className="absolute left-0 top-1/2 -translate-y-1/2 text-blue-600 hover:text-blue-800 font-semibold">
                        &larr; Back to Home
                    </button>
                    <h1 className="text-4xl font-extrabold text-slate-800">Rent Travel Gear</h1>
                    <p className="mt-2 text-lg text-slate-600">Find the equipment you need from our community of travelers.</p>
                </div>
                
                <div className="mb-6">
                    <div className="flex flex-wrap justify-center gap-3">
                        {categories.map(category => (
                            <button
                                key={category}
                                onClick={() => setSelectedCategory(category)}
                                className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors duration-200 ${
                                    selectedCategory === category
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-white text-slate-700 hover:bg-slate-200 shadow-sm'
                                }`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredItems.map(item => (
                        <GearCard key={item.id} item={item} owner={ownersMap[item.ownerId]} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default GearRentalMarketplace;
