import React, { useState, useCallback } from 'react';
import { TripPreferences, TripPlan } from './types.ts';
import LandingPage from './components/LandingPage.tsx';
import TripForm from './components/TripForm.tsx';
import LoadingView from './components/LoadingView.tsx';
import TripPlanView from './components/TripPlanView.tsx';
import TourGuidesMarketplace from './components/TourGuidesMarketplace.tsx';
import GearRentalMarketplace from './components/GearRentalMarketplace.tsx';
import { generateTripPlan } from './services/geminiService.ts';

type AppState = 'landing' | 'form' | 'loading' | 'plan' | 'error' | 'tours' | 'gear';

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>('landing');
  const [tripPlan, setTripPlan] = useState<TripPlan | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleStartPlanning = () => setAppState('form');
  const handleViewTours = () => setAppState('tours');
  const handleViewGear = () => setAppState('gear');

  const handleBackToHome = () => {
    setTripPlan(null);
    setErrorMessage('');
    setAppState('landing');
  };
  
  const handleResetToForm = () => {
    setTripPlan(null);
    setErrorMessage('');
    setAppState('form');
  };

  const handleFormSubmit = useCallback(async (preferences: TripPreferences) => {
    setAppState('loading');
    setErrorMessage('');
    try {
      const plan = await generateTripPlan(preferences);
      setTripPlan(plan);
      setAppState('plan');
    } catch (error) {
      console.error("Error generating trip plan:", error);
      const message = error instanceof Error ? error.message : "An unknown error occurred. Please try again.";
      setErrorMessage(`Failed to generate your trip plan. ${message}`);
      setAppState('error');
    }
  }, []);

  const renderContent = () => {
    switch (appState) {
      case 'landing':
        return <LandingPage onStartPlanning={handleStartPlanning} onViewTours={handleViewTours} onViewGear={handleViewGear} />;
      case 'form':
        return <TripForm onSubmit={handleFormSubmit} onBack={handleBackToHome} />;
      case 'loading':
        return <LoadingView />;
      case 'plan':
        return tripPlan && <TripPlanView plan={tripPlan} onReset={handleBackToHome} />;
      case 'tours':
        return <TourGuidesMarketplace onBack={handleBackToHome} />;
      case 'gear':
        return <GearRentalMarketplace onBack={handleBackToHome} />;
      case 'error':
        return (
          <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center">
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-md">
                <h2 className="text-2xl font-bold text-red-600 mb-4">Oops! Something went wrong.</h2>
                <p className="text-slate-600 mb-6">{errorMessage}</p>
                <button
                onClick={handleResetToForm}
                className="w-full bg-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors duration-300"
                >
                Try Again
                </button>
            </div>
          </div>
        );
      default:
        return <LandingPage onStartPlanning={handleStartPlanning} onViewTours={handleViewTours} onViewGear={handleViewGear} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800">
      {renderContent()}
    </div>
  );
};

export default App;
