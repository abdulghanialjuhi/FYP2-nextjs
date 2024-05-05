import React, { useContext, useEffect, useState } from 'react'
import { AsideComponent } from '../profile'
import axios from 'axios'
import { Context } from '../../../context/GlobalState'
import { SectionLoadingIndicator } from '../../common/LoadingIndicator'
import StyledTable from '../../common/StyledTable'
import Modal from '../../common/Modal'
import { BarberPicker, TimePicker } from '../barbershopDetails/BarbershopServices'
import { checkBooking, getDayIndices } from '../../../utils/bookingUtils'
export default function MyBooking() {

    const [editModal, setEditModal] = useState(false)
    const [editedBooking, setEditedBooking] = useState({})
    const [booking, setBooking] = useState([])
    const [processedBooking, setProcessedBooking] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const { user } = useContext(Context)


    useEffect(() => {
        axios.get(`/api/booking`, {params: {user: user._id}})
        .then(async(res) => {
            console.log(res)
            const processedBooking = res.data?.data?.map((item) => {

                // console.log('item: ', item.barbershop.services);
                return ({...item, 
                    barbershopName: item.barbershop.name, 
                    barber: item.barbershop.barbers.find(bar => bar._id === item.barber), 
                    barberName: item.barbershop.barbers.find(bar => bar._id === item.barber).name, 
                    service: item.barbershop.services.find(ser => ser._id === item.service),
                    serviceName: item.barbershop.services.find(ser => ser._id === item.service).service, 
                    date: item.date?.split('T')[0],
                })
            })
            // console.log('processedBooking: ', processedBooking);
            setProcessedBooking(processedBooking)
            setBooking(res.data.data)
        })
        .catch((err) => {
            setError(err)
            console.log(err)
        })
        .finally(() => setLoading(false))
    }, []) 

    useEffect(() => console.log('processedBooking: ', processedBooking), [processedBooking])

    const handleEditBarber = (id) => {
        // console.log(id);
        setEditedBooking(processedBooking?.find(item => item._id === id))
        setEditModal(true)
    }

    const tableOptions = [
        {'name': 'Edit', 'icon': 'fa fa-edit', 'onclick': handleEditBarber},
    ]

    const columns = [
        { field: 'barbershopName', headerName: 'Barbershop'},
        { field: 'barberName', headerName: 'Barber'},
        { field: 'date', headerName: 'Date'},
        { field: 'time', headerName: 'Time'},
        { field: 'serviceName', headerName: 'Service'},
    ]


    return (
       <div className='flex flex-grow'>
            <AsideComponent />

            <div className='flex flex-grow p-2'>
                {loading ? (
                    <SectionLoadingIndicator />
                ) : error ? (
                    <div className="flex flex-grow items-center justify-center">
                        <h2> Something went wrong </h2>
                    </div>
                ) : ( 
                    <>
                        <div className='flex flex-grow flex-col px-3 mt-3'>
                            <div className='flex w-full my-3  justify-between items-center'>
                                <h4 className='text-lg'> My Booking </h4>
                            </div>
                            <StyledTable columns={columns} data={processedBooking} options={tableOptions} />
                        </div>

                        {editModal && <EditBookinModal setEditModal={setEditModal} editModal={editModal} editedBooking={editedBooking} setProcessedBooking={setProcessedBooking} />}
                    </>
                )}
            </div>
        </div>
    )
}


const EditBookinModal = ({ editModal, setEditModal, editedBooking, setProcessedBooking }) => {
    const [btnLoading, setBtnLoading] = useState(false)
    const todayDate = new Date().toISOString().split('T')[0];
    const [bookDate, setBookDate] = useState(new Date(editedBooking.date))
    const [selectedBarber, setSelectedBarber] = useState(null)
    const [booktime, setBooktime] = useState(null)
    
    const { addNewNotifcation } = useContext(Context)

    useEffect(() => {
        setSelectedBarber(editedBooking.barber)
        setBooktime(editedBooking.time)
    }, [])

    console.log('editedBooking: ', editedBooking);
    const handleUpdateBooking = async () => {

        if (!booktime || !bookDate || !selectedBarber) {
            return addNewNotifcation('Please fill in all fields')
        }
        const isBooked = await checkBooking(editedBooking.service, selectedBarber, editedBooking.barbershop, bookDate, booktime)
        console.log('isBooked21: ', isBooked);


        const bookObj = {
            ...editedBooking,
            barber: selectedBarber._id,
            date: bookDate.toISOString().split('T')[0],
            time: booktime,
            // status: 'pending',
        }

        // isBarberBooked(id, selectedBarber._id, )
        console.log('bookObj: ', bookObj);
        axios.put(`/api/booking/${editedBooking._id}`, bookObj)
        .then((res) => {
            console.log('res: ', res);

            addNewNotifcation('Booking updated successfully', 'success')
            setEditModal(false)
            setProcessedBooking(prev => {
                return prev.map((obj) => {
                    if (obj._id === editedBooking._id) {
                        return { ...bookObj }; 
                    }
                    return obj;
                });
            });
        }).catch((error) => {
            console.log('error: ', error);
        }).finally(() => {
            setBtnLoading(false)
        })
    }

    // get off days
    const offDays = []
    editedBooking.barbershop.businesHours.forEach((item) => {
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


    return (
        <div>
            <Modal $isOpen={editModal} setOpenModal={setEditModal} >
                <Modal.Header>
                    Edit Booking
                </Modal.Header>
                <Modal.Body>
                {editedBooking.service &&
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
                                <BarberPicker selectedBarber={selectedBarber} setSelectedBarber={setSelectedBarber} bookDate={bookDate} {...editedBooking.barbershop} />
                            </div>
                            
                            <div className='flex flex-col w-full gap-2'>
                                <span className='text-gray-500'>
                                    Time
                                </span>
                                {bookDate && selectedBarber?._id && <TimePicker booktime={booktime} setBooktime={setBooktime} bookDate={bookDate} {...editedBooking.barbershop} serviceSelected={editedBooking.service} selectedBarber={selectedBarber} />}
                            </div>
                        </div>}
                </Modal.Body>
                <Modal.Footer>
                    <div className="flex  justify-end">
                        <div className="w-[40%] flex gap-2">
                            <button onClick={() => setEditModal(false)} className="seconday-button"> Cancel </button>
                            <button disabled={btnLoading} onClick={handleUpdateBooking} className="primary-button"> Update </button>
                        </div>
                    </div>
                </Modal.Footer>
            </Modal>
        </div>
    )   
}