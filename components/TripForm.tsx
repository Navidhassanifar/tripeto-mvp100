import React, { useState } from 'react';
import { TripPreferences, TravelInterest } from '../types.ts';

interface TripFormProps {
  onSubmit: (preferences: TripPreferences) => void;
  onBack: () => void;
}

const interestOptions = Object.values(TravelInterest);

const TripForm: React.FC<TripFormProps> = ({ onSubmit, onBack }) => {
  const today = new Date().toISOString().split('T')[0];
  const [budget, setBudget] = useState(5000000);
  const [startDate, setStartDate] = useState(today);
  const [endDate, setEndDate] = useState('');
  const [travelers, setTravelers] = useState(2);
  const [selectedInterests, setSelectedInterests] = useState<TravelInterest[]>([]);
  const [error, setError] = useState('');

  const handleInterestToggle = (interest: TravelInterest) => {
    setSelectedInterests(prev =>
      prev.includes(interest)
        ? prev.filter(i => i !== interest)
        : [...prev, interest]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedInterests.length === 0) {
      setError('Please select at least one interest.');
      return;
    }
    if (!endDate) {
        setError('Please select an end date.');
        return;
    }
    if (new Date(endDate) < new Date(startDate)) {
        setError('End date cannot be before start date.');
        return;
    }
    setError('');
    onSubmit({
      budget,
      startDate,
      endDate,
      travelers,
      interests: selectedInterests,
    });
  };
  
  const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newStartDate = e.target.value;
    setStartDate(newStartDate);
    if (endDate && new Date(endDate) < new Date(newStartDate)) {
      setEndDate(newStartDate);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-100 p-4">
      <div className="w-full max-w-2xl mx-auto">
        <div className="mb-4 self-start">
            <button onClick={onBack} className="text-blue-600 hover:text-blue-800 font-semibold flex items-center group">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 transition-transform group-hover:-translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Back to Home
            </button>
        </div>
        <div className="w-full bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-3xl font-bold text-center text-slate-800 mb-2">Plan Your Dream Trip to Kish</h2>
            <p className="text-center text-slate-500 mb-8">Tell us your preferences, and our AI will craft the perfect itinerary.</p>
            <form onSubmit={handleSubmit} className="space-y-6">
            <div>
                <label htmlFor="budget" className="block text-sm font-medium text-slate-700 mb-1">Your Total Budget (Toman)</label>
                <input
                type="number"
                id="budget"
                value={budget}
                onChange={e => setBudget(Number(e.target.value))}
                className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                min="1000000"
                step="100000"
                required
                />
                <p className="text-xs text-slate-500 mt-1">{budget.toLocaleString()} Toman</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                <label htmlFor="travelers" className="block text-sm font-medium text-slate-700 mb-1">Number of Travelers</label>
                <input
                    type="number"
                    id="travelers"
                    value={travelers}
                    onChange={e => setTravelers(Number(e.target.value))}
                    className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    min="1"
                    max="10"
                    required
                />
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="startDate" className="block text-sm font-medium text-slate-700 mb-1">Start Date</label>
                        <input
                        type="date"
                        id="startDate"
                        value={startDate}
                        min={today}
                        onChange={handleStartDateChange}
                        className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                        required
                        />
                    </div>
                    <div>
                        <label htmlFor="endDate" className="block text-sm font-medium text-slate-700 mb-1">End Date</label>
                        <input
                        type="date"
                        id="endDate"
                        value={endDate}
                        min={startDate}
                        onChange={e => setEndDate(e.target.value)}
                        className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                        required
                        />
                    </div>
                </div>
            </div>
            
            <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Travel Style / Interests</label>
                <div className="flex flex-wrap gap-3">
                {interestOptions.map(interest => (
                    <button
                    key={interest}
                    type="button"
                    onClick={() => handleInterestToggle(interest)}
                    className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors duration-200 ${
                        selectedInterests.includes(interest)
                        ? 'bg-blue-600 text-white'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                    >
                    {interest}
                    </button>
                ))}
                </div>
            </div>
            
            {error && <p className="text-red-500 text-sm text-center">{error}</p>}

            <button
                type="submit"
                className="w-full bg-blue-600 text-white font-bold py-4 px-6 rounded-lg text-lg hover:bg-blue-700 transition-colors duration-300"
            >
                Generate My Itinerary
            </button>
            </form>
        </div>
      </div>
    </div>
  );
};

export default TripForm;
