import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Sheet, SheetContent, SheetFooter, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { useToast } from '@/hooks/use-toast'
import { bookingsService } from '@/services'
import { Flight } from '@/types/entities'
import { FlightBooking, flightBookingSchema } from '@/types/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { format } from 'date-fns'
import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

interface Props {
    open: boolean,
    onClose: () => void,
    flight: Flight
}

export const FlightCheckoutForm = ({ open, onClose, flight }: Props) => {
    const { toast } = useToast()
    const form = useForm<FlightBooking>({
        resolver: zodResolver(flightBookingSchema)
    })

    const registerBooking: SubmitHandler<FlightBooking> = async (data) => {

        try {
            const bookingData = {
                ...data,
                flightId: flight._id,
                totalPrice: data.numberOfSeats * flight.price
            }

            const bookingId = await bookingsService.registerBooking(bookingData);
            toast({
                variant: 'default',
                title: 'Su compra se proceso correctamente',
                description: `El numero de ticket es ${bookingId}`
            })
        } catch (error) {
            console.error('Error:', error)
            toast({
                variant: 'destructive',
                title: 'Uh! algo salio mal',
                description: `Su compra no puedo terminarse`
            })
        } finally {
            form.reset()
            onClose()
        }
    }

    const onSubmit = form.handleSubmit(registerBooking);

    return (
        <>
            <Sheet
                open={open}
                onOpenChange={onClose}
            >

                <SheetContent side={'bottom'} className="min-h-[300px]">
                    <Form
                        {...form}
                    >
                        <form onSubmit={onSubmit} >
                            <SheetHeader>
                                <SheetTitle>Comprar Vuelo de {flight.origin} a {flight.destination}</SheetTitle>
                            </SheetHeader>
                            <div className='grid sm:grid-cols-2 gap-4'>
                                <div className='flex flex-col text-black text-sm mt-5'>
                                    <div className='mb-3'>
                                        <label className='block'>Fecha de Salida</label>
                                        <span className='text-gray-600'>{format(flight.departureDate, 'yyyy-MM-dd hh:mm')}</span>
                                    </div>
                                    <div className='mb-3'>
                                        <label className='block'>Fecha de Llegada</label>
                                        <span className='text-gray-600'>{format(flight.arrivalDate, 'yyyy-MM-dd hh:mm')}</span>
                                    </div>
                                    <div className='mb-3'>
                                        <label className='block'>Precio</label>
                                        <span className='text-gray-600'>S/. {flight.price}</span>
                                    </div>
                                </div>
                                <div className='flex flex-col text-black text-sm mt-5 gap-y-4'>
                                    <FormField
                                        name="numberOfSeats"
                                        render={({ field }) => (
                                            <FormItem >
                                                <FormLabel>Cantidad de Pasajeros</FormLabel>
                                                <FormControl  >
                                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                        <SelectTrigger className="">
                                                            <SelectValue placeholder="Seleccione el número de pasajeros" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectItem value="1">1</SelectItem>
                                                            <SelectItem value="2">2</SelectItem>
                                                            <SelectItem value="3">3</SelectItem>
                                                            <SelectItem value="4">4</SelectItem>
                                                            <SelectItem value="5">5</SelectItem>
                                                            <SelectItem value="6">6</SelectItem>
                                                            <SelectItem value="7">7</SelectItem>
                                                            <SelectItem value="8">8</SelectItem>
                                                            <SelectItem value="9">9</SelectItem>
                                                            <SelectItem value="10">10</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        name="customerName"
                                        render={({ field }) => (
                                            <FormItem >
                                                <FormLabel>Cliente</FormLabel>
                                                <FormControl  >
                                                    <Input {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        name="cardNumber"
                                        render={({ field }) => (
                                            <FormItem >
                                                <FormLabel>Número de tarjeta</FormLabel>
                                                <FormControl  >
                                                    <Input type='number' {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </div>
                            <br />
                            <SheetFooter >
                                <Button type="submit" >Comprar</Button>
                            </SheetFooter>
                        </form>
                    </Form>
                </SheetContent>
            </Sheet >
        </>
    )
}
