import React, { useRef } from "react"

export default function BarbershopWorkingHours({ wokringHours }) {
    const nameRef = useRef()
    const locationRef = useRef()

    const weekDays = [
        { day: 'Monday', openTime: '09:00', closeTime: '17:00' },
        { day: 'Tuesday', openTime: '09:00', closeTime: '17:00' },
        { day: 'Wednesday', openTime: '09:00', closeTime: '17:00' },
        { day: 'Thursday', openTime: '09:00', closeTime: '17:00' },
        { day: 'Friday', openTime: '09:00', closeTime: '17:00' },
        { day: 'Saturday', openTime: '10:00', closeTime: '14:00' },
        { day: 'Sunday', openTime: 'Closed', closeTime: 'Closed' }
    ];
    

    
    return (                   
        <div className='w-[350px] h-full bg-gray-0 rounded-md border border-gray-200 p-4 flex flex-col'>
            <div className="w-full flex px-2 py-5 mb-2 border-b gap-4 items-center">
                <i aria-hidden className="fa fa-phone text-primaryColor"></i>
                <span> phone number </span>
            </div>
            
            <div className="flex w-full px-2 mt-4">
                <ul className="flex flex-col gap-3 w-full">
                    {weekDays.map((item) => (
                        <li key={item.day} className="flex justify-between">
                            <span className="text-gray-500"> {item.day} </span>
                            
                            <div>
                                <span className="text-gray-500"> {item.openTime} </span>-<span className="text-gray-500"> {item.closeTime} </span>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>

        </div>
    )
}