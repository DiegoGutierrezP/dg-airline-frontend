import { z } from 'zod'

export const flightFilterSchema = z.object({
    origin: z.string({ required_error: 'El campo es requerido' }),
    destination: z.string({ required_error: 'El campo es requerido' }),
    date: z.date(),
})

export type FlightFilter = z.infer<typeof flightFilterSchema>

export const flightBookingSchema = z.object({
    // flightId: z.string(),
    numberOfSeats: z.string().transform(v => +v),
    customerName: z.string(),
    cardNumber: z.string(),
    // totalPrice: z.number(),
    // passengers: z.array(z.any())
})

export type FlightBooking = z.infer<typeof flightBookingSchema>