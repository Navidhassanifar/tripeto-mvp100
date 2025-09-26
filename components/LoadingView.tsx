
import React from 'react';

const LoadingView: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-100">
      <div className="w-16 h-16 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
      <h2 className="mt-6 text-2xl font-semibold text-slate-700">Crafting Your Perfect Itinerary...</h2>
      <p className="mt-2 text-slate-500">Our AI is analyzing the best options for you.</p>
    </div>
  );
};

export default LoadingView;
