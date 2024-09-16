import Image from 'next/image'
import React from 'react'

export const Navbar = () => {
    return (
        <nav className='w-full h-[70px] bg-white text-center flex items-center justify-center border-b border-gray-100 shadow-md'>
            <Image
                src="/airplaneicon.png"
                alt="logo"
                width={80}
                height={40}
                priority
                className='-rotate-12'
            />
            <h2 className='font-semibold text-xl text-center tracking-wide text-violet-600'>
                DG Airline
            </h2>
        </nav>
    )
}
