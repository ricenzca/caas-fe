import useSWR from "swr"
import fetcher from "../utils/fetcher"
import { FlightPlan } from "@/types/flightPlan"

interface UseFlightPlans {
    flightPlans: FlightPlan[]
    error: Error | null
    isLoading: boolean
}

export default function useFlightPlans(callSign: string): UseFlightPlans {
    const baseUri = process.env.NEXT_PUBLIC_BASE_URI
    const { data, error, isLoading } = useSWR(callSign.length > 0 && `${baseUri}/flights?callSign=${callSign}`, fetcher)
    return {
        flightPlans: data,
        error,
        isLoading
    }
}
