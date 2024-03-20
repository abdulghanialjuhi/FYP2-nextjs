import Image from 'next/image'
import React from 'react'
import BarbershopSearchCard from './BarbershopSearchCard'
import { useRouter } from 'next/router'

export default function Barbershops() {
    const barbershops = [
        {_id: '1333', name: 'barbershop', location: 'location', review: 4.5, img: '/barber-banner.jpg'}
    ]

    return (
        <div className='flex flex-grow p-8'>
            <div className='w-full max-w-[1200px] mx-auto flex flex-col'>
                <div className='w-full flex mb-6'>
                    <h2 className='font-[600] text-2xl'> BarberShops </h2>
                </div>
                <div className='flex w-full gap-4'>
                    <div className='flex w-full flex-col gap-3'>
                        <BarberShopCard {...barbershops[0]} />
                        <BarberShopCard {...barbershops[0]} />
                    </div>
                    <BarbershopSearchCard />
                </div>
            </div>
        </div>
    )
}

const BarberShopCard = ({ _id, name, location, review, img }) => {

    const router = useRouter()

    const hanldeClick = () => {
        router.push(`/barbershops/${_id}`)
    }
    
    return (
        <div onClick={hanldeClick} className='flex w-full h-[260px] bg-gray-0 rounded-md border border-gray-200 p-4 cursor-pointer hover:shadow-lg'>
            <div className='flex w-[40%] h-[220px] max-w-[400px] rounded-sm overflow-hidden'>
                <Image src={img} width={200} height={200} className='w-full h-full' />
            </div>

            <div className='flex flex-grow flex-col ml-4'>
                <div className='flex w-full mb-4'>
                    <h4 className='font-[600] text-[18px] text-gray-600'> {name} </h4>
                </div>

                <ul className='flex w-full mb-4 flex-col gap-2'>
                    <li className='text-gray-600 font-[300] text-[15px]'>Location: {location} </li>
                    <li className='text-gray-600 font-[300] text-[15px]'>Review: {review} </li>
                </ul>

                <div className='mt-auto py-2 border-t border-t-gray-200 w-full'>
                    <div className='w-[40px] h-[40px]'>
                        <div className='w-full h-full rounded-full relative overflow-hidden'>
                            <Image src={img} layout='fill' objectFit="cover" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}


