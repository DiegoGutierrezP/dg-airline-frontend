import { fetcher } from "@/lib/fetcher"
import { FlightFilterParams } from "@/types/dtos"
import { Flight } from "@/types/entities"

const FLIGHTS_API = 'http://localhost:3001'

export const getFlights = async (queryParams: FlightFilterParams) => {
    try {
        const res = await fetcher<any, Flight[]>({
            endpoint: `${FLIGHTS_API}/flights`,
            method: 'GET',
            cache: 'no-store',
            queryParams
        })

        if (res.status !== 200) {
            return []
        }
        return res.data
    } catch (err) {
        console.log(err)
        return []
    }
}

export const getFlight = async (id: string) => {
    try {
        const res = await fetcher<any, Flight>({
            endpoint: `${FLIGHTS_API}/flights/${id}`,
            method: 'GET',
            // cache: ''
        })
        if (res.status !== 200) {
            return null
        }
        return res.data
    } catch (err) {
        console.log(err)
        return null
    }
}