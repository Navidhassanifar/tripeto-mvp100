
import React from 'react';

interface LandingPageProps {
  onStartPlanning: () => void;
  onViewTours: () => void;
  onViewGear: () => void;
}

const PaperPlaneIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 md:h-10 md:w-10 transform -rotate-45 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
    </svg>
);

const AITripIcon = (props: { className: string }) => <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.898 20.572L16.5 21.75l-.398-1.178a3.375 3.375 0 00-2.455-2.456L12.75 18l1.178-.398a3.375 3.375 0 002.455-2.456L16.5 14.25l.398 1.178a3.375 3.375 0 002.456 2.456L20.25 18l-1.178.398a3.375 3.375 0 00-2.456 2.456z" /></svg>;
const GuideIcon = (props: { className: string }) => <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m-7.5-2.962A3.75 3.75 0 0115 9.75v6.308A3.75 3.75 0 019.75 21a3.75 3.75 0 01-3.75-3.75V13.5m10.5-4.125c0-6.21-5.04-11.25-11.25-11.25S1.5 3.189 1.5 9.375c0 2.551 1.04 4.9 2.823 6.674M16.5 18.75h-2.25m0-11.25h2.25m-7.5 0h2.25m-4.5 0h2.25m0 3.75h2.25m-4.5 0h2.25" /></svg>;
const GearIcon = (props: { className: string }) => <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.25H3.375c-.621 0-1.125.504-1.125 1.125V14.25m13.125-13.125L12 2.25" /></svg>;

const FeatureCard: React.FC<{icon: React.ReactElement, title: string, description: string, onClick: () => void}> = ({ icon, title, description, onClick }) => (
    <div onClick={onClick} className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20 cursor-pointer group hover:bg-white/20 transition-all duration-300">
        <div className="flex-shrink-0 h-14 w-14 rounded-full bg-blue-500/80 flex items-center justify-center mb-4 group-hover:bg-blue-500 transition-all duration-300">
            {React.cloneElement(icon, { className: "h-8 w-8 text-white" })}
        </div>
        <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
        <p className="text-slate-300">{description}</p>
    </div>
);

const LandingPage: React.FC<LandingPageProps> = ({ onStartPlanning, onViewTours, onViewGear }) => {
  return (
    <div className="relative min-h-screen w-full text-white overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://picsum.photos/seed/kishisland/1920/1080"
          alt="Kish Island beach"
          className="w-full h-full object-cover"
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Header/Logo */}
        <header className="p-4 md:p-6">
            <div className="flex items-center space-x-3">
                <PaperPlaneIcon />
                <span className="text-3xl md:text-4xl font-bold tracking-wider">Tripeto</span>
            </div>
        </header>

        {/* Main Hero Section */}
        <main className="flex-grow flex flex-col items-center justify-center text-center p-4">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold mb-4 tracking-tight" style={{textShadow: '0 0 20px rgba(0,0,0,0.5)'}}>
                Your Journey, Reimagined
            </h1>
            <p className="text-lg md:text-xl lg:text-2xl mb-12 max-w-3xl text-slate-200" style={{textShadow: '0 0 10px rgba(0,0,0,0.5)'}}>
                From AI-powered plans to local guides and gear rentals.
                Your complete Iranian travel platform starts here.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl w-full">
                <FeatureCard 
                    icon={<AITripIcon className="" />}
                    title="AI Trip Planner"
                    description="Generate a personalized, intelligent travel plan for Kish Island in minutes."
                    onClick={onStartPlanning}
                />
                <FeatureCard 
                    icon={<GuideIcon className="" />}
                    title="Tour Guides"
                    description="Book unique tours with certified local guides for an authentic experience."
                    onClick={onViewTours}
                />
                <FeatureCard 
                    icon={<GearIcon className="" />}
                    title="Gear Rentals"
                    description="Rent travel equipment from a community of owners at your destination."
                    onClick={onViewGear}
                />
            </div>
        </main>

        {/* Footer */}
        <footer className="p-4 text-center text-sm text-slate-400">
            <p>&copy; {new Date().getFullYear()} Tripeto. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
};

export default LandingPage;
