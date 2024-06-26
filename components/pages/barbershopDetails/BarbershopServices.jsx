import React, { useContext, useEffect, useState } from 'react'
import Modal from '../../common/Modal'
import styled from 'styled-components'
import { addTimeToDate, checkBookedSlot, getAvailableTimeSlots, getDayIndices, getDayOfWeek, isBarberBooked } from '../../../utils/bookingUtils'
import { Context } from '../../../context/GlobalState'
import Image from 'next/image'
import axios from 'axios'

export default function BarbershopServices({ id, services, barber }) {

    const [isOpen, setIsOpen] = useState(false)
    const [btnLoading, setBtnLoading] = useState(false)
    const [serviceSelected, setServiceSelected] = useState()
    const [bookDate, setBookDate] = useState(new Date)
    const [selectedBarber, setSelectedBarber] = useState(null)
    const [booktime, setBooktime] = useState(null)
    const todayDate = new Date().toISOString().split('T')[0];
    const { addNewNotifcation, user, isAuth } = useContext(Context)
    const handleSeriveSelect = (service) => {
        setServiceSelected(service)
        setIsOpen(true)
    }

    // get off days
    const offDays = []
    barber.businesHours.forEach((item) => {
        if (!item.isOpen) {
            offDays.push(item.day)
        }
    })
    const disabledDays = getDayIndices(offDays)

    // Function to check if a date is disabled
    const isDisabledDate = (date) => {
        return disabledDays.includes(date.getDay());
    };

    const handleDateChange = (event) => {
        const selectedDate = new Date(event.target.value);
        if (isDisabledDate(selectedDate)) {
          alert('You cannot select this day. Barbershop is closed');
          // Reset to the current date if selected date is disabled
          setBookDate(new Date);
        } else {
          setBookDate(selectedDate);
        }
    };


    // console.log('serviceSelected: ', serviceSelected);

    const handleBook = () => {
        if (!isAuth) {
            return addNewNotifcation('You must login to make an appointment')
        } else if (!booktime || !bookDate || !selectedBarber) {
            return addNewNotifcation('Please fill in all fields')
        }

        
        // console.log('bookDate: ', bookDate, booktime);
        
        // setBtnLoading(true)
        const bookObj = {
            user: user._id,
            service: serviceSelected._id,
            barber: selectedBarber._id,
            date: bookDate,
            time: booktime,
            barbershop: id,
            status: 'pending',
        }

        // isBarberBooked(id, selectedBarber._id, )
        console.log('bookObj: ', bookObj);
        axios.post('/api/booking', bookObj)
        .then((res) => {
            console.log('res: ', res);
        }).catch((error) => {
            console.log('error: ', error);
        }).finally(() => {
            setBtnLoading(false)
        })
    }

    return (
        <div className='flex flex-grow bg-gray-0 rounded p-2'>
            <ul className='flex w-full flex-col gap-3'>
                {services.map((item, i) => (
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
                        {serviceSelected &&
                        <div className='flex flex-grow flex-col gap-4 max-w-[750px] mx-auto my-8 h-full'>
                            <div className='flex flex-col w-full gap-2'>
                                <span className='text-gray-500'>
                                    Date
                                </span>
                                <input min={todayDate} value={bookDate.toISOString().slice(0, 10)} onChange={handleDateChange} className='p-2 border rounded' type="date" />
                            </div>
                            <div className='flex flex-col w-full gap-2'>
                                <span className='text-gray-500'>
                                    Choose Barber
                                </span>
                                <BarberPicker selectedBarber={selectedBarber} setSelectedBarber={setSelectedBarber} bookDate={bookDate} {...barber} />
                            </div>
                            
                            <div className='flex flex-col w-full gap-2'>
                                <span className='text-gray-500'>
                                    Time
                                </span>
                                {bookDate && selectedBarber?._id && <TimePicker booktime={booktime} setBooktime={setBooktime} bookDate={bookDate} {...barber} serviceSelected={serviceSelected} selectedBarber={selectedBarber} />}
                            </div>
                        </div>}
                    </Modal.Body>

                    <Modal.Footer>
                        <div className='flex w-full flex-col items-end'>
                            <div className='flex flex-col px-2 mb-3'>
                                <span className='text-2xl'>RM{serviceSelected?.price}</span>
                                <span className='text-gray-400 font-[300] text-end'> {serviceSelected?.duration?.split(':')[0]}h {serviceSelected?.duration?.split(':')[1]}min </span>
                            </div>
                            <div className='flex w-full gap-4 ml-auto max-w-[350px]'>
                                <button onClick={() => setIsOpen(false)} className='seconday-button'> Cancel </button>
                                <button disabled={btnLoading} onClick={handleBook} className='primary-button'> Book </button>
                            </div>
                           
                        </div>
                    </Modal.Footer>
                </Modal>
            </ul>
        </div>
    )
}

export const BarberPicker = ({ bookDate, barbers, selectedBarber, setSelectedBarber }) => {

    const [indexAnimation, setIndexAnimation] = useState(0)

    return (
        <ul className='flex w-full gap-2 overflow-hidden items-center my-4'>
            <span onClick={() => setIndexAnimation(prev => prev + 6)} className='px-2 cursor-pointer'> <i className="fa fa-angle-left" aria-hidden="true"></i> </span>
            <div className={`flex w-full overflow-scroll gap-4 py-1 px-3 transform translate-z-[${indexAnimation}px] transition-all`}>
                {barbers.map((item) => (
                    <li key={item._id} onClick={() => setSelectedBarber(prev => prev?._id === item._id ? null : item)} 
                    className={`flex min-w-[150px] min-h-[150px] justify-center border cursor-pointer hover:bg-gray-200 relative rounded ${selectedBarber?._id === item._id ? 'border border-gray-400' : ''}`}> 
                        <div className='absolute right-[-10px] top-[-10px] px-2 py-1 bg-gray-0 shadow rounded text-sm max-w-[100px] overflow-hidden truncate'>
                            {item.rate || '4.4'}
                        </div>
                        <div className='absolute left-[15px] bottom-[15px] px-3 py-1 bg-gray-0 rounded text-sm max-w-[100px] overflow-hidden truncate'>
                            {item.name}
                        </div>
                        <Image alt='barber' src={item.photo?.blob ? URL.createObjectURL(item.photo?.blob) : '/anonymous.png'} width={150} height={150} className='rounded' />
                    </li>
                ))}
            </div>
            <span onClick={() => setIndexAnimation(prev => prev - 17)} className='px-2 cursor-pointer'> <i className="fa fa-angle-right" aria-hidden="true"></i> </span>
        </ul>
    )
}


export const TimePicker = ({ serviceSelected, _id, businesHours, bookDate, booktime, setBooktime, selectedBarber }) => {

    // console.log('businesHours: ', businesHours);
    const day = getDayOfWeek(bookDate);
    const serviceDay = businesHours.find((item) => item.day === day)
    // console.log('serviceDay: ', serviceDay);
    const [indexAnimation, setIndexAnimation] = useState(0)
    const [availableTimeSlots, setAvailableTimeSlots] = useState([])

    const bookObj = {
        barbershop: _id,
        service: serviceSelected?._id,
        barber: selectedBarber?._id,
        date: bookDate
    }
    console.log('bookObj: ', bookObj);

    useEffect(() => {
        checkTimeSlots()
    }, [bookDate, serviceSelected, selectedBarber])

    const checkTimeSlots = async () => {
        const availableTimeSlots1 = getAvailableTimeSlots(serviceDay?.openTime, serviceDay?.closeTime, serviceSelected?.duration);
        const newRes = await checkBookedSlot(availableTimeSlots1, bookObj)
        setAvailableTimeSlots(newRes)
        // console.log('newRes: ', newRes);
        // console.log(availableTimeSlots1);
    }


    return (
        <ul className='flex w-full gap-2 overflow-hidden items-center'>
            <span onClick={() => setIndexAnimation(prev => prev + 6)} className='px-2 cursor-pointer'> <i className="fa fa-angle-left fa-2x" aria-hidden="true"></i> </span>
            <div className={`flex w-full overflow-scroll gap-4 py-1 px-3 transform translate-z-[${indexAnimation}px] transition-all`}>
                {availableTimeSlots.map((item) => (
                    <li key={item.startTime} className={`flex min-w-[120px] justify-center border`}> 
                    <button onClick={() => setBooktime(prev => prev === item.startTime ? null : item.startTime)} disabled={item.booked} className={`disabled:bg-gray-300 disabled:cursor-not-allowed px-4 py-2 cursor-pointer hover:bg-gray-200 w-full ${booktime === item.startTime ? 'bg-gray-200' : ''}`}>
                        {item.startTime}
                    </button>
                    </li>
                ))}
            </div>
            <span onClick={() => setIndexAnimation(prev => prev - 17)} className='px-2 cursor-pointer'> <i className="fa fa-angle-right fa-2x" aria-hidden="true"></i> </span>
        </ul>
    )
}

