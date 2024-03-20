import React, { useRef } from "react"

export default function BarbershopSearchCard() {
    const nameRef = useRef()
    const locationRef = useRef()

    
    return (                   
        <div className='w-[450px] h-[400px] bg-gray-0 rounded-md border border-gray-200 p-4 flex flex-col'>
            <div className="w-full flex mb-3 relative">
                <input ref={nameRef} type="text" name="name" className="input-control" placeholder="Name" />
                <div className="absolute top-0 right-0 h-full flex items-center pr-5">
                    <i aria-hidden className="fa fa-search text-primaryColor"></i>
                </div>
            </div>
            <div className="w-full flex mb-3 relative">
                <input ref={locationRef} type="text" name="location" className="input-control" placeholder="Location" />
                <div className="absolute top-0 right-0 h-full flex items-center pr-5">
                    <i aria-hidden className="fa fa-location-arrow text-primaryColor"></i>
                </div>
            </div>

            <div className="mt-auto w-full flex">
                <button className="primary-button">
                    Clear Search
                </button>
            </div>
        </div>
    )
}