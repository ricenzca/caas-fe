import useSWR from "swr"
import fetcher from "../utils/fetcher"
import { FlightPlanDetails } from "@/types/flightPlan"

interface UseFlightPlansDetails {
    flightPlanDetails: FlightPlanDetails
    error: Error | null
    isLoading: boolean
}

export default function useFlightPlanDetails(id: string): UseFlightPlansDetails {
    const baseUri = process.env.NEXT_PUBLIC_BASE_URI
    const { data, error, isLoading } = useSWR(id.length > 0 && `${baseUri}/flights/${id}`, fetcher)
    return {
        flightPlanDetails: data,
        error,
        isLoading
    }
}
