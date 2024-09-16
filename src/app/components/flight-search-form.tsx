'use client'

import React from 'react'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Calendar } from "@/components/ui/calendar"
import { Button } from '@/components/ui/button'
import { CalendarIcon } from '@radix-ui/react-icons'
import { cn } from '@/lib/utils'
import { format } from 'date-fns'
import { FlightFilter, flightFilterSchema } from '@/types/schemas'
import { useRouter } from 'next/navigation'

export const FlightSearchForm = () => {
    const router = useRouter();
    const form = useForm<FlightFilter>({
        resolver: zodResolver(flightFilterSchema)
    })

    const searchSubmit: SubmitHandler<FlightFilter> = async (data) => {
        console.log(data)
        router.replace(`?origin=${data.origin}&destination=${data.destination}&date=${format(data.date, "yyyy-MM-dd")}`);
    }

    const onSubmit = form.handleSubmit(searchSubmit);

    return (
        <>
            <Form {...form} >
                <form
                    onSubmit={onSubmit}
                    className='flex flex-wrap items-center  gap-2 w-full'
                >
                    <FormField
                        name="origin"
                        render={({ field }) => (
                            <FormItem className='w-[300px]' >
                                <FormLabel>Origen</FormLabel>
                                <FormControl  >
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <SelectTrigger className="">
                                            <SelectValue placeholder="Seleccione el origen" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Lima">Lima</SelectItem>
                                            <SelectItem value="Arequipa">Arequipa</SelectItem>
                                            <SelectItem value="Cusco">Cusco</SelectItem>
                                            <SelectItem value="Piura">Piura</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        name="destination"
                        render={({ field }) => (
                            <FormItem className='w-[300px]'>
                                <FormLabel>Destino</FormLabel>
                                <FormControl>
                                    <Select onValueChange={field.onChange} defaultValue={field.value} >
                                        <SelectTrigger className="">
                                            <SelectValue placeholder="Seleccione el destino" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Lima">Lima</SelectItem>
                                            <SelectItem value="Arequipa">Arequipa</SelectItem>
                                            <SelectItem value="Cusco">Cusco</SelectItem>
                                            <SelectItem value="Piura">Piura</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        name="date"
                        render={({ field }) => (
                            <FormItem className="flex flex-col">
                                <FormLabel>Fecha</FormLabel>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <FormControl>
                                            <Button
                                                variant={"outline"}
                                                className={cn(
                                                    "w-[240px] pl-3 text-left font-normal !bg-transparent",
                                                    !field.value && "text-muted-foreground"
                                                )}
                                            >
                                                {field.value ? (
                                                    format(field.value, "yyyy-MM-dd")
                                                ) : (
                                                    <span>Seleccione na fecha</span>
                                                )}
                                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                            </Button>
                                        </FormControl>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0" align="start">
                                        <Calendar
                                            mode="single"
                                            selected={field.value}
                                            onSelect={field.onChange}
                                            disabled={(date) =>
                                                date < new Date()
                                            }
                                            initialFocus
                                        />
                                    </PopoverContent>
                                </Popover>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button
                        type="submit"
                        className=" mt-5"
                    >
                        Buscar
                    </Button>
                </form>
            </Form>
        </>
    )
}
