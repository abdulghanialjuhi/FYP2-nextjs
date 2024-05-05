'use client'

import Image from 'next/image'
import React, { useContext } from 'react'
import BarbershopSearchCard from './BarbershopSearchCard'
import { useRouter } from 'next/router'
import { useBarbers } from '../../../hooks/useBarbers'
import { Context } from '../../../context/GlobalState'
import { SectionLoadingIndicator } from '../../common/LoadingIndicator'

export default function Barbershops() {
    const { barbers, loading } = useBarbers()
    const { filter } = useContext(Context)



    const nameHandler = (item) => {
        return item.name.toLowerCase().includes(filter.name?.toLowerCase());
    }

    const stateHandler = (item) => {
        return item.state.toLowerCase().includes(filter.state?.toLowerCase());
    }

    const cityHandler = (item) => {
        return item.city.toLowerCase().includes(filter.city?.toLowerCase());
    }

    const serviceHandler = (item) => {
        console.log('item: ', item);
        const filteredServices = item.services.filter(service => {
            return filter.services.filter((ite) => ite.checked).some(item1 => {
                // Convert both names to lowercase for case-insensitive comparison
                return item1.name.toLowerCase() === service.service.toLowerCase();
            });
        });
        return filteredServices;
    }

    if (loading) {
        return <SectionLoadingIndicator />
    }

    return (
        <div className='flex flex-grow p-8'>
            <div className='w-full max-w-[1200px] mx-auto flex flex-col'>
                <div className='w-full flex mb-6'>
                    <h2 className='font-[600] text-2xl'> BarberShops </h2>
                </div>
                <div className='flex w-full gap-4'>
                    <div className='flex w-full flex-col gap-3'>
                        {barbers    
                        ?.filter(nameHandler)
                        ?.filter(stateHandler)
                        ?.filter(cityHandler)
                        ?.filter(serviceHandler)
                        .map((barber) => (
                            <BarberShopCard key={barber._id} {...barber} />
                        ))}
                    </div>
                    <BarbershopSearchCard />
                </div>
            </div>
        </div>
    )
}

export const BarberShopCard = ({ _id, name, location, review, barbers, state, city, images, owner }) => {

    const router = useRouter()

    const hanldeClick = () => {
        router.push(`/barbershops/${_id}`)
    }
    return (
        <div onClick={hanldeClick} className='flex w-full h-[260px] bg-gray-0 rounded-md border border-gray-200 p-4 cursor-pointer hover:shadow-lg'>
            <div className='flex w-[40%] h-[220px] max-w-[400px] rounded-sm overflow-hidden'>
                <Image 
                alt='barbershop-image'
                // src={images[0]?.blob} 
                src={images.length > 0 ? URL.createObjectURL(images[0].blob) : ''}
                width={200} height={200} className='w-full h-full' />
            </div>

            <div className='flex flex-grow flex-col ml-4'>
                <div className='flex w-full mb-4'>
                    <h4 className='font-[600] text-[18px] text-gray-600'> {name} </h4>
                </div>

                <ul className='flex w-full mb-4 flex-col gap-2'>
                    <li className='text-gray-600 font-[300] text-[15px]'>State: {state} </li>
                    <li className='text-gray-600 font-[300] text-[15px]'>City: {city} </li>
                    <li className='text-gray-600 font-[300] text-[15px]'>Barbers: {barbers?.length} </li>
                    {/* <li className='text-gray-600 font-[300] text-[15px]'>Review: {review} </li> */}
                </ul>

                <div className='mt-auto py-2 border-t border-t-gray-200 w-full'>
                    <div className='w-full flex gap-3'>
                        <div className='w-[40px] h-[40px] rounded-full relative overflow-hidden'>
                            <Image
                            alt='owner-image'
                            src={owner?.profile ? URL.createObjectURL(owner?.profile.blob) : ''}
                            layout='fill' objectFit="cover" />
                        </div>
                        <div className='flex ml-4 items-center'>
                            <span> {owner.fullName} </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}


