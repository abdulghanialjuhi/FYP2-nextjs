import Image from 'next/image'
import React from 'react'

export default function Home() {

    return (
        <div className='flex flex-grow flex-col'>
            {/* <div class="absolute inset-0 bg-gradient-to-b from-[#2E2E2E] to-transparent z-30"></div> */}

            <section className='flex flex-grow h-screen w-screen'>
                <div className='flex absolute w-screen h-screen top-0'>
                    <div class="absolute bottom-0 left-0 right-0 top-0 w-full bg-[rgb(35,39,51)] opacity-60 z-20"/>
                    <div class="fixed top-0  w-full h-full">
                        <Image src={'/barber-banner.jpg'} layout='fill' className='w-full min-w-[1000px] h-full min-h-[600px]' />
                    </div>

                </div>

                <div className='flex flex-grow z-20'>
                    <div className='w-full max-w-[1200px] mx-auto flex h-full text-white justify-between items-center'>
                        <h1 className='text-[55px] font-[800] text-secondaryColor text-justify'> Step into Style, Reserve Your Barber Chair! </h1>

                        <div className='w-full flex justify-end mt-4'>   
                            {/* <button className='py-2 px-4 rounded bg-secondaryColor text-black hover:bg-secondaryColorHover'> Book now </button> */}
                            <div className='w-[480px] h-[430px] bg-gray-0 rounded p-6 flex shadow-custom'>

                            </div>
                        </div>

                    </div>
                </div>
            </section>

            <section className='flex flex-grow h-screen w-screen bg-gray-100 z-20'>

            </section>

        </div>
    )
}
