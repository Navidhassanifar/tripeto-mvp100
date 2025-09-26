
import React from 'react';
import { TripPlan, DailyPlan, PlannedActivity } from '../types.ts';

interface TripPlanViewProps {
  plan: TripPlan;
  onReset: () => void;
}

const formatCurrency = (amount: number) => `${amount.toLocaleString()} Toman`;

// FIX: Replaced JSX.Element with React.ReactElement to resolve "Cannot find namespace 'JSX'" error.
const InfoCard: React.FC<{ icon: React.ReactElement; title: string; children: React.ReactNode }> = ({ icon, title, children }) => (
    <div className="bg-white p-6 rounded-xl shadow-md flex items-start space-x-4">
        <div className="flex-shrink-0 h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
            {React.cloneElement(icon, { className: "h-6 w-6 text-blue-600" })}
        </div>
        <div>
            <h3 className="text-lg font-bold text-slate-800">{title}</h3>
            <div className="text-slate-600 mt-1">{children}</div>
        </div>
    </div>
);

const ActivityCard: React.FC<{ activity: PlannedActivity }> = ({ activity }) => (
    <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
        <p className="font-bold text-slate-700">{activity.name} <span className="text-sm font-medium text-slate-500 ml-2">({activity.time})</span></p>
        <p className="text-sm text-slate-600 mt-1">{activity.description}</p>
        <p className="text-sm font-semibold text-blue-600 mt-2">{formatCurrency(activity.cost)}</p>
    </div>
);

const DayItinerary: React.FC<{ dayPlan: DailyPlan }> = ({ dayPlan }) => (
    <div className="bg-white p-6 rounded-xl shadow-md">
        <h4 className="text-xl font-bold text-slate-800 border-b pb-2 mb-4">Day {dayPlan.day} - {new Date(dayPlan.date).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</h4>
        <div className="space-y-4">
            {dayPlan.activities.map((activity, index) => (
                <ActivityCard key={index} activity={activity} />
            ))}
        </div>
    </div>
);

const PlaneIcon = (props: {className: string}) => <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" /></svg>;
const HotelIcon = (props: {className: string}) => <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" /></svg>;
const WalletIcon = (props: {className: string}) => <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M21 12a2.25 2.25 0 00-2.25-2.25H15a3 3 0 11-6 0H5.25A2.25 2.25 0 003 12m18 0v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 9m12 0V9" /></svg>;

const TripPlanView: React.FC<TripPlanViewProps> = ({ plan, onReset }) => {
    return (
        <div className="min-h-screen bg-slate-100 p-4 sm:p-6 lg:p-8">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-extrabold text-slate-800">Your Kish Island Adventure!</h1>
                    <p className="mt-2 text-lg text-slate-600 max-w-2xl mx-auto">{plan.tripSummary}</p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                    <InfoCard icon={<PlaneIcon className='' />} title="Flight Details">
                        <p><span className="font-semibold">{plan.flight.airline}</span></p>
                        <p>{formatCurrency(plan.flight.totalPrice)} (Round-trip)</p>
                    </InfoCard>
                    <InfoCard icon={<HotelIcon className='' />} title="Accommodation">
                        <p><span className="font-semibold">{plan.hotel.name}</span></p>
                        <p>{formatCurrency(plan.hotel.totalPrice)} for {plan.hotel.nights} nights</p>
                    </InfoCard>
                    <InfoCard icon={<WalletIcon className='' />} title="Total Cost">
                        <p className="text-xl font-bold text-blue-600">{formatCurrency(plan.costBreakdown.total)}</p>
                        <p className="text-xs">Flights: {formatCurrency(plan.costBreakdown.flights)}</p>
                        <p className="text-xs">Hotel: {formatCurrency(plan.costBreakdown.hotel)}</p>
                        <p className="text-xs">Activities: {formatCurrency(plan.costBreakdown.activities)}</p>
                    </InfoCard>
                </div>

                <div className="mb-8">
                    <h2 className="text-3xl font-bold text-slate-800 text-center mb-6">Daily Itinerary</h2>
                    <div className="space-y-6">
                        {plan.itinerary.map((dayPlan) => (
                            <DayItinerary key={dayPlan.day} dayPlan={dayPlan} />
                        ))}
                    </div>
                </div>
                
                <div className="text-center mt-10">
                    <button
                        onClick={onReset}
                        className="bg-blue-600 text-white font-bold py-3 px-8 rounded-lg text-base hover:bg-blue-700 transition-colors duration-300"
                    >
                        Back to Home
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TripPlanView;
