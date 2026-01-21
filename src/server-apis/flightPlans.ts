import { FlightPlan } from "@/types/flightPlan";

export const getFlightPlans = async (callSign?: string | undefined): Promise<FlightPlan[]> => {
    try {
        const baseUri = process.env.BASE_URI;
        const flightPlanUri = baseUri + '/flights';
        const uri = callSign ? `${flightPlanUri}?callSign=${callSign}` : flightPlanUri

        const res = await fetch(uri, { cache: 'no-store' })
        return res.json()
    } catch (error) {
        console.error('Error getting flight plans:', error);
        return [];
    }
};
