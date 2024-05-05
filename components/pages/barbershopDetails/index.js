import { useParams } from 'next/navigation';
import React from 'react'
import BarbershopWorkingHours from './BarbershopWorkinghours';
import BarbershopImages from './BarbershopImages';
import BarbershopServices from './BarbershopServices';
import { useBarber } from '../../../hooks/useBarberDetails';
import { SectionLoadingIndicator } from '../../common/LoadingIndicator';

export default function BarberShopDetails() {
    
    const parmms = useParams()
    const { id } = parmms
    const { barber, loading } = useBarber(id)

    return (
        <div className='flex flex-grow p-8'>
            {loading ? (
                <SectionLoadingIndicator />
            ) : !barber ? (<h2>Barber not found</h2>) : (
                <>
                    <div className='w-full max-w-[1100px] mx-auto flex flex-col my-4'>
                        <div className='flex w-full justify-between my-4'>
                            <div>
                                <h4 className='flex'>
                                    {barber.name}
                                </h4>
                            </div>
                            
                            <div>
                                <span className='flex'>
                                    {barber.rate || 'rate'}
                                </span>
                            </div>

                        </div>

                        <div className='w-full flex gap-4 h-[500px]'>
                            <BarbershopImages images={barber.images} />
                            <BarbershopWorkingHours wokringHours={barber.businesHours} />
                        </div>

                        <div className='mt-4 flex w-full'>
                            <BarbershopServices id={id} services={barber.services} barber={barber} />
                        </div>
                    </div>
                </>
            )}
        </div>
    )
}
