import { FlightPlan, FlightPlanDetails } from "@/types/flightPlan";

export const getFlightPlans = async (callSign?: string | undefined | null): Promise<FlightPlan[] | Error> => {
    try {
        const baseUri = process.env.BASE_URI;
        const flightPlanUri = baseUri + '/flights';
        const uri = callSign ? `${flightPlanUri}?callSign=${callSign}` : flightPlanUri

        const res = await fetch(uri, { cache: 'no-store' })
        return res.json()
    } catch (error) {
        const errMsg = 'Error encountered while getting flight plans'
        console.error(errMsg, error);
        return new Error(errMsg);
    }
};

export const getFlightPlanDetails = async (id?: string): Promise<FlightPlanDetails | Error> => {
    if (!id || id.length === 0) return new Error("Invalid ID");

    try {
        const baseUri = process.env.BASE_URI;
        const flightPlanUri = baseUri + '/flights';
        const uri = `${flightPlanUri}/${id}`

        const res = await fetch(uri, { cache: 'no-store' })
        return res.json()
    } catch (error) {
        const errMsg = 'Error encountered while getting flight plan details'
        console.error(errMsg, error);
        return new Error(errMsg);
    }
};