import React, { useState } from 'react'
import Modal from '../../common/Modal'
import styled from 'styled-components'

export default function BarbershopServices({ services }) {

    const [isOpen, setIsOpen] = useState(false)
    const [serviceSelected, setServiceSelected] = useState({})

    const services1 = [
        {
            service: 'service name',
            price: 23,
            duration: '0:20'
        },
        {
            service: 'service name1',
            price: 25,
            duration: '0:20'
        }
    ]

    const handleSeriveSelect = (service) => {
        setServiceSelected(service)
        setIsOpen(true)
    }

    console.log('serviceSelected: ', serviceSelected);

    return (
        <div className='flex flex-grow bg-gray-0 rounded p-2'>
            <ul className='flex w-full flex-col gap-3'>
                {services1.map((item, i) => (
                    <li key={i} className='flex w-full py-2 px-5 border'>
                        <div className='flex flex-col'>
                            <h4 className='font-[400] text-gray-800'> {item.service} </h4>
                            <span className='text-gray-500'> {item.price} </span>
                        </div>
                        <div className=' ml-auto'>
                            <button onClick={handleSeriveSelect.bind(this, item)} className='primary-button'>
                                Book
                            </button>
                        </div>
                    </li>
                ))}

                <Modal $isOpen={isOpen} setOpenModal={setIsOpen}>
                    <Modal.Header> Book </Modal.Header>

                    <Modal.Body>
                        <div className='flex flex-grow flex-col max-w-[750px] mx-auto'>
                            <div className='flex flex-col w-full gap-2'>
                                <span className='text-gray-500'>
                                    Date
                                </span>
                                <input className='p-2 border rounded' type="date" />
                            </div>
                            <div className='flex flex-col w-full gap-2'>
                                <span className='text-gray-500'>
                                    Time
                                </span>
                                <TimePicker serviceSelected={serviceSelected} />
                            </div>
                        </div>
                    </Modal.Body>

                    <Modal.Footer>
                        footer
                    </Modal.Footer>
                </Modal>
            </ul>
        </div>
    )
}


const TimePicker = ({ serviceSelected, openHouese=[] }) => {

    const daySel = 'Monday'
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
        <ul className='flex w-full gap-2'>
            
        </ul>
    )
}