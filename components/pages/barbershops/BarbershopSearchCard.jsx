import React, { useContext, useEffect, useRef, useState } from "react"
import AnimatedInput from "../../common/StyledInput"
import states from "../../../data/states"
import { ServicesSelect } from "../home"
import { Context } from "../../../context/GlobalState"

export default function BarbershopSearchCard() {

    const { actions, filter } = useContext(Context)

    const handleSearchChange = (name, value) => {

        actions({type: 'SET_FILTER', payload: (prevState => ({
            ...prevState,
            [name]: value
          }))
        })
    }

    const handleClearSearch = () => {
        actions({type: 'SET_FILTER', payload: {
            name: '',
            state: '',
            city: '',
            services: [
                { id: 1, name: "Haircut", checked: false },
                { id: 2, name: "Beard Trim", checked: false },
                { id: 3, name: "Hot Towel Shave", checked: false },
                { id: 4, name: "Hair Coloring", checked: false },
                { id: 5, name: "Scalp Treatment", checked: false },
                { id: 6, name: "Facial Treatment", checked: false }
            ]
        }
        })
    }

    return (                   
        <div className='w-[450px] h-[400px] bg-gray-0 rounded-md border border-gray-200 p-4 flex flex-col'>
            <div className='flex w-full flex-col gap-4 mt-4 text-black'>
                <div className='flex w-full'>
                    <AnimatedInput value={filter.name} onChange={(e) => handleSearchChange('name', e.target.value)} placeholderName='Name' type='text' />
                </div>
                <div className='flex w-full'>
                    {/* <AnimatedInput placeholderName='State' type='option' /> */}
                    <select value={filter.state} onChange={(e) => handleSearchChange('state', e.target.value)} className='w-full flex p-[0.75rem] border border-[#ddddddd9] text-primaryColor rounded' name="state">
                        <option disabled value=''> Choose state </option>
                        {states.map((state) => (
                            <option key={state} value={state}> {state} </option>
                        ))}
                    </select>
                </div>
                <div className='flex w-full'>
                    <AnimatedInput value={filter.city} onChange={(e) => handleSearchChange('city', e.target.value)} placeholderName='City' type='text' />
                </div>

                <div className='flex w-full'>
                    <ServicesSelect />
                </div>

                {/* <div className='flex mt-auto w-full'>
                    <button onClick={handleSearch} className='primary-button'>
                        Search
                    </button>
                </div> */}
            </div>


            <div className="mt-auto w-full flex">
                <button onClick={handleClearSearch} className="primary-button">
                    Clear Search
                </button>
            </div>
        </div>
    )
}