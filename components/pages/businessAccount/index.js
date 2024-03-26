import React from 'react'
import { AsideComponent, SettingSection, } from '../profile'

export default function BusinessAccount() {

    return (
        <div className='flex flex-grow'>
            <AsideComponent />

            <div className='flex flex-grow p-2 flex-col'>
                <div className='pl-[6%] pr-6 my-[4rem] flex flex-grow flex-col'>
                    <div className='w-full my-4 flex'>
                        <h3 className='text-2xl'> Barbershop </h3>
                    </div>

                    {/* user profle */}
                    <SettingSection title={''} >
                        <div className='flex flex-grow flex-col'>
                            hi
                        </div>
                    </SettingSection>
                
                </div>
            </div>
        </div>
    )
}
