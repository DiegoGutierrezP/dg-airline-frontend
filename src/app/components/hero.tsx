// import Image from 'next/image'
import React from 'react'
import { FlightSearchForm } from './flight-search-form'

export const Hero = () => {
    return (
        // <div className='w-full mx-auto h-[200px] sm:h-[300px] lg:h-[400px]'>
        //     <Image
        //         src="/airline-background.jpg"
        //         alt="logo"
        //         width={0}
        //         height={0}
        //         sizes="100vw"
        //         // style={{ width: '100%', height: 'auto' }} // optional
        //         priority
        //         className='w-full h-full object-fill'
        //     />
        // </div>
        <div
            style={{
                backgroundImage: `url('/airline-background.jpg')`,
            }}
            className="
            w-full
            h-screen
            max-h-[30rem]
            relative
            overflow-hidden
            z-10

            bg-cover
            bg-no-repeat
            bg-center

            before:content-['']
            before:absolute
            before:inset-0
            before:block
            before:bg-gray-600
            before:opacity-40
            before:z-[-5]
            "

        >
            <div className='shadow m-auto w-[80%] mt-[50px] sm:mt-[200px] p-4 rounded-md bg-violet-500'>
                <h4 className='font-semibold ' >Buscar Vuelos</h4>
                <div className='w-full border border-b-1 border-gray-100 opacity-10 my-2' ></div>
                <FlightSearchForm />
            </div>
        </div>
        // <div className='w-full relative bg-orange-500 h-[400px]'>
        //     <div
        //         style={{
        //             backgroundImage: `url('/airline-background.jpg')`,
        //         }}
        //         className="
        //     w-full
        //     h-[300px]
        //     relative

        //     bg-cover
        //     bg-no-repeat
        //     bg-center
        //     "
        //     >
        //         <div className='w-full h-full bg-gray-400 opacity-40'>

        //         </div>
        //     </div>

        //     <div className='p-4 absolute flex items-center justify-center  top-[200px] left-0 right-0 mx-auto'>
        //         <div className='w-[500px] bg-violet-500 p-4 rounded-md  '>
        //             BUSCADOR
        //         </div>
        //     </div>

        // </div>

    )
}
