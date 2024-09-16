import { fetcher } from "@/lib/fetcher"
import { RegisterBookingRequest } from "@/types/dtos"

const BOOKINGS_API = 'http://localhost:3002'

export const registerBooking = async (data: RegisterBookingRequest) => {
    try {
        const res = await fetcher<RegisterBookingRequest, { bookingId: string }>({
            endpoint: `${BOOKINGS_API}/bookings`,
            method: 'POST',
            cache: 'no-store',
            body: data
        })

        if (res.status != 200 && res.status != 201) {
            throw new Error('OCurrio un error')
        }

        return res.data.bookingId;

    } catch (err) {
        console.log(err)
        throw new Error('OCurrio un error')
    }
}