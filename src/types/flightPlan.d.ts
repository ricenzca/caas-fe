export interface FlightPlan {
    id: string
    callSign: string;
    departure: string;
    arrival: string;
}

export interface FlightPlanDetails extends FlightPlan {
    wayPoints: Waypoint[]
}

export interface Waypoint {
    [key: string]: {
        lat: number;
        lng: number;
    }
}