import useFlightPlanDetails from "@/client-apis/useFlightPlanDetails";
import { LatLngExpression } from "leaflet";
import DynamicMap from "./DynamicMap";

interface CardMapProps {
    id: string;
}
export default function CardMap({ id }: CardMapProps) {
    const { flightPlanDetails, isLoading, error } = useFlightPlanDetails(id);

    const positions: LatLngExpression[] = []
    if (flightPlanDetails.wayPoints?.length > 0) {
        flightPlanDetails.wayPoints.forEach((wayPoint) => {
            Object.values(wayPoint).forEach((value) => {
                positions.push([value.lat, value.lng])
            })
        })
    }

    return (
        <div>
            {isLoading && <p>Loading...</p>}
            {error && <p>Failed to load</p>}
            {flightPlanDetails &&
                < div className="w-full h-100 my-4">
                    <DynamicMap positions={positions} />
                </div>
            }
        </div>
    )
}