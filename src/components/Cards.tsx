import { FlightPlan } from "@/types/flightPlan";
import Card from "./Card";

interface CardsProps {
    flightPlans: FlightPlan[];
}

export default function Cards({ flightPlans }: CardsProps) {
    if (!flightPlans || flightPlans.length === 0) return null;

    const cards = flightPlans.map((flight, i) => (
        <Card
            key={i}
            id={flight.id}
            callSign={flight.callSign}
            departure={flight.departure}
            arrival={flight.arrival}
        />
    ))

    return (
        <div className="flex flex-col w-full">
            <h1 className="mx-auto text-black text-lg font-bold">Flight Plans</h1>
            <div>{cards}</div>
        </div>
    )
}