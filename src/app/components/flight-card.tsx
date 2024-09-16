'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { flightsService } from '@/services'
import { Flight } from '@/types/entities'
import { format } from 'date-fns'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { FlightCheckoutForm } from './flight-checkout-form'

export const FlightCard = ({ flight }: { flight: Flight }) => {
    const router = useRouter();
    const [openInfo, setOpenInfo] = useState(false)
    const [openCheckout, setOpenCheckout] = useState(false)
    const [numberOfSeats, setNumberOfSeats] = useState('1')

    const validateAvailableSeats = async () => {
        const data = await flightsService.getFlight(flight._id);
        console.log(data)
        if (!data)
            return false

        return data.availableSeats >= +numberOfSeats;
    }

    const onSubmit = async () => {
        console.log(numberOfSeats)
    }

    const handleOpenCheckout = () => {
        setOpenInfo(false)
        setOpenCheckout(true)
    }

    return (
        <>
            <Card onClick={() => setOpenInfo(true)} className='overflow-hidden cursor-pointer' >
                <Image
                    src="/lima.jpg"
                    alt="landscape"
                    width={0}
                    height={0}
                    sizes="100vw"
                    priority
                    className='w-full h-auto object-fill'
                />
                <CardContent className='py-4'>
                    <h4 className='font-medium text-lg'>Vuelo a {flight.destination}</h4>
                    <p className='text-base'>Partiendo desde {flight.origin}</p>
                    <div className='my-2'>
                        <label className='block text-sm mb-1'>Precio</label>
                        <span className='inline-block'>S/. {flight.price}</span>
                    </div>
                </CardContent>
            </Card>

            <Dialog open={openInfo} onOpenChange={setOpenInfo}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle className='text-black pb-4' >Vuelo de {flight.origin} a {flight.destination}</DialogTitle>
                        <DialogDescription>
                            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Perspiciatis, impedit laboriosam.
                        </DialogDescription>
                    </DialogHeader>
                    <div className='flex flex-col text-black text-sm'>
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
                        {/* <div className='mb-3'>
                            <label className='block'>Pasajeros</label>
                            <Select onValueChange={setNumberOfSeats} value={numberOfSeats}  >
                                <SelectTrigger className="">
                                    <SelectValue placeholder="Seleccione el número de pasajeros" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value={'1'}>1</SelectItem>
                                    <SelectItem value={'2'}>2</SelectItem>
                                    <SelectItem value={'3'}>3</SelectItem>
                                    <SelectItem value={'4'}>4</SelectItem>
                                    <SelectItem value={'5'}>5</SelectItem>
                                    <SelectItem value={'6'}>6</SelectItem>
                                    <SelectItem value={'7'}>7</SelectItem>
                                    <SelectItem value={'8'}>8</SelectItem>
                                    <SelectItem value={'9'}>9</SelectItem>
                                    <SelectItem value={'10'}>10</SelectItem>
                                </SelectContent>
                            </Select>
                        </div> */}
                    </div>
                    <DialogFooter>
                        <Button onClick={handleOpenCheckout} >Comprar</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            <FlightCheckoutForm
                open={openCheckout}
                onClose={() => setOpenCheckout(false)}
                flight={flight}
            />
        </>

    )
}
