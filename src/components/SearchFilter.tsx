'use client'
import { useState } from 'react';
import Cards from './Cards';
import useFlightPlans from '@/client-apis/useFlightPlans';
import useDebounce from '@/client-apis/useDebounce';

interface SearchFilterProps {
    children: React.ReactNode;
}
export default function SearchFilter({ children }: SearchFilterProps) {
    const [callSign, setCallSign] = useState('');
    const debouncedSearch = useDebounce(callSign, 500);
    const { flightPlans, isLoading, error } = useFlightPlans(debouncedSearch);

    return (
        <div className="w-full flex flex-col items-center text-black">
            <form className="py-8">
                <label>CallSign Filter:&nbsp;</label>
                <input
                    className="w-60 border border-black rounded-md px-2 py-1"
                    type="text"
                    placeholder="e.g. SIA403"
                    value={callSign}
                    onChange={(e) => setCallSign(e.target.value)}
                />
            </form>
            <div className='flex justify-center w-1/2'>
                {!callSign ? children :
                    isLoading ? <p>Loading...</p> :
                        error ? <p>Failed to load</p> :
                            flightPlans && flightPlans.length > 0 ?
                                <Cards flightPlans={flightPlans} /> :
                                <p>No flight plans found</p>
                }
            </div>
        </div>
    )
}