
import React, { useMemo, useState } from 'react';
import { Tour, Guide, TravelInterest } from '../types.ts';
import { TOURS, GUIDES } from '../data/tourData.ts';

interface TourGuidesMarketplaceProps {
    onBack: () => void;
}

const StarIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.007z" clipRule="evenodd" />
    </svg>
);

const TourCard: React.FC<{ tour: Tour; guide: Guide }> = ({ tour, guide }) => {
    return (
        <div className="bg-white rounded-xl shadow-md overflow-hidden transform hover:-translate-y-1 transition-transform duration-300">
            <img className="h-48 w-full object-cover" src={tour.imageUrl} alt={tour.title} />
            <div className="p-6">
                <p className="text-xs font-semibold text-blue-600 uppercase tracking-wide">{tour.category}</p>
                <h3 className="text-xl font-bold text-slate-800 mt-1">{tour.title}</h3>
                <p className="text-slate-600 mt-2">{tour.durationHours} hours ・ Max {tour.maxGroupSize} people</p>
                <div className="flex items-center mt-4">
                    <img className="h-10 w-10 rounded-full" src={guide.avatarUrl} alt={guide.name} />
                    <div className="ml-3">
                        <p className="text-sm font-semibold text-slate-900">{guide.name}</p>
                        <div className="flex items-center">
                            <StarIcon className="h-4 w-4 text-yellow-500" />
                            <p className="text-sm text-slate-600 ml-1">{guide.rating}</p>
                        </div>
                    </div>
                </div>
                <div className="mt-6 flex justify-between items-center">
                    <p className="text-lg font-bold text-slate-900">{tour.pricePerPerson.toLocaleString()} <span className="text-sm font-normal text-slate-600">Toman/person</span></p>
                    <button className="bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">Book Now</button>
                </div>
            </div>
        </div>
    );
};

const TourGuidesMarketplace: React.FC<TourGuidesMarketplaceProps> = ({ onBack }) => {
    const [selectedCategory, setSelectedCategory] = useState<string>('All');
    const categories = ['All', ...Object.values(TravelInterest)];

    const filteredTours = useMemo(() => {
        if (selectedCategory === 'All') return TOURS;
        return TOURS.filter(tour => tour.category === selectedCategory);
    }, [selectedCategory]);

    const guidesMap = useMemo(() => {
        return GUIDES.reduce((acc, guide) => {
            acc[guide.id] = guide;
            return acc;
        }, {} as Record<string, Guide>);
    }, []);

    return (
        <div className="min-h-screen bg-slate-100 p-4 sm:p-6 lg:p-8">
            <div className="max-w-7xl mx-auto">
                <div className="relative text-center mb-8">
                    <button onClick={onBack} className="absolute left-0 top-1/2 -translate-y-1/2 text-blue-600 hover:text-blue-800 font-semibold">
                        &larr; Back to Home
                    </button>
                    <h1 className="text-4xl font-extrabold text-slate-800">Find Your Perfect Tour</h1>
                    <p className="mt-2 text-lg text-slate-600">Explore authentic experiences with our certified local guides.</p>
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
                    {filteredTours.map(tour => (
                        <TourCard key={tour.id} tour={tour} guide={guidesMap[tour.guideId]} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TourGuidesMarketplace;
