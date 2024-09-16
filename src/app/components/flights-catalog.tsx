import { flightsService } from '@/services';
import { FlightFilterParams } from '@/types/dtos';
import { Flight } from '@/types/entities';
import { useSearchParams } from 'next/navigation';
import React from 'react'
import { FlightCard } from './flight-card';


export const FlightsCatalog = async ({ origin, destination, date }: Partial<FlightFilterParams>) => {

    let flightsData: Flight[] | null = [];

    const existsFilters = origin && destination && date;

    if (existsFilters) {
        flightsData = await flightsService.getFlights({ origin, destination, date })
    } else {
        flightsData = []
    }

    return (
        <div className='grid sm:grid-cols-3 gap-4 p-5'>
            {
                flightsData.map(flight => (
                    <FlightCard flight={flight} />
                ))
            }

            {
                (flightsData.length === 0) && (
                    <div className='sm:col-span-3 text-center p-4 text-gray-500'>
                        {existsFilters ? 'No se encontraron vuelos' : 'Ningun vuelo para mostrar'}
                    </div>
                )
            }
        </div>
    )
}
