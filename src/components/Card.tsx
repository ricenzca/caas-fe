'use client'

import { useState } from "react";
import CardMap from "./CardMap";
import UpIcon from '@public/up.svg';

interface CardProps {
    id: string;
    callSign: string;
    departure: string;
    arrival: string;
}
export default function Card({ id, callSign, departure, arrival }: CardProps) {
    const [showMap, setShowMap] = useState(false)

    return (
        <div>
            <div id={id} className="border border-black rounded-md text-black px-4 py-4 my-2 grid grid-cols-3 hover:bg-gray-100"
                onClick={() => { setShowMap(prevState => !prevState) }}>
                <div className="text-blue-900 font-bold text-xl">{callSign}</div>
                <div className="grid grid-cols-3 px-4 text-center">
                    <div>{departure}</div>
                    <div>{'->'}</div>
                    <div>{arrival}</div>
                </div>
                <div className="flex justify-end"><UpIcon className={`w-6 h-6 ${!showMap && 'rotate-180'}`} /></div>

            </div>
            {showMap && <CardMap id={id} />}
        </div >

    )
}

