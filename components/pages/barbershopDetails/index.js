import { useParams } from 'next/navigation';
import React from 'react'
import BarbershopWorkingHours from './BarbershopWorkinghours';
import BarbershopImages from './BarbershopImages';

export default function BarberShopDetails() {
    
    const parmms = useParams()
    const { id } = parmms
    console.log('id: ', id);


    return (
        <div className='flex flex-grow p-8'>
            <div className='w-full max-w-[1200px] mx-auto flex flex-col'>
                <div className='flex w-full justify-between my-4'>
                    <div>
                        <h4 className='flex'>
                            name
                        </h4>
                    </div>
                    
                    <div>
                        <span className='flex'>
                            rate
                        </span>
                    </div>

                </div>

                <div className='w-full flex gap-4 h-[500px]'>
                    <BarbershopImages images={[]} />

                    <BarbershopWorkingHours wokringHours={[]} />
                </div>

                <div className='mt-4 flex w-full'>

                </div>
            </div>
        </div>
    )
}
