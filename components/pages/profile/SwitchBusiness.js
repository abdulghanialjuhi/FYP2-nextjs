import { useContext, useEffect, useState } from "react"
import Switch from "./Switch"
import Modal from "../../common/Modal"
import { SettingInput } from "."
import { useRef } from "react"
import malayStates from "../../../data/states"
import { Context } from "../../../context/GlobalState"
import axios from "axios"
import MediaUploader from "../../common/MediaLoader"
import Services from "./Services"
import Barbers from "./Barbers"
import Business from "./BusinessHours"


const isAnyServiceEmpty = (services) => {
    return services.some(service => {
        return (
            service.service.trim() === '' ||
            service.price === 0 || service.price === '0' || service.price === '' ||
            service.duration.trim() === '' || service.duration.trim() === '0:00' || service.duration.trim() === '0:0'
        );
    });
};

const isAnyBarberEmpty = (barbers) => {
    return barbers.some(barber => {
        return (
            barber.name.trim() === '' );
    });
};

const isAnyFieldEmptyForOpenDays = (business) => {
    // Filter the business array to get only the objects where isOpen is true
    const openDays = business.filter(item => item.isOpen);

    // Check if any field in the filtered objects is empty
    return openDays.some(day => {
        return (
            day.day.trim() === '' ||
            day.openTime.trim() === '' ||
            day.closeTime.trim() === ''
        );
    });
};

function isValidLatitude(latitude) {
    return !isNaN(latitude) && latitude >= -90 && latitude <= 90;
}

function isValidLongitude(longitude) {
    return !isNaN(longitude) && longitude >= -180 && longitude <= 180;
}



export default function SettingSwitch({ name, onClick, icon }) {

    const textColor = name === 'Logout' ? 'text-[#721c24]' : 'text-primaryColor'

    const [active, setActive] = useState(false)
    const [modal, setModal] = useState(false)
    const [btnLoading, setBtnLoading] = useState(false)
    const [selectedImgs, setSelectedImgs] = useState([])
    const [services, setServices] = useState([{
        service: '',
        price: 0,
        duration: '0:0'
    }])
    const [barbers, setBarbers] = useState([{
        name: '',
        photo: null,
    }])
    const [business, setBusiness] = useState([
        { day: 'Monday', openTime: '10:00', closeTime: '22:00', isOpen: true },
        { day: 'Tuesday', openTime: '10:00', closeTime: '22:00', isOpen: true},
        { day: 'Wednesday', openTime: '10:00', closeTime: '22:00', isOpen: true},
        { day: 'Thursday', openTime: '10:00', closeTime: '22:00', isOpen: true},
        { day: 'Friday', openTime: '10:00', closeTime: '22:00', isOpen: true},
        { day: 'Saturday', openTime: '', closeTime: '', isOpen: false},
        { day: 'Sunday', openTime: '', closeTime: '', isOpen: false}
    ])

    const { addNewNotifcation, user } = useContext(Context)

    const nameRef = useRef()
    const phoneRef = useRef()
    const stateRef = useRef()
    const cityRef = useRef()
    const latitudeRef = useRef()
    const longitudeRef = useRef()


    useEffect(() => {
        if (user.business) {
            setActive(true)
        }
    }, [])


    const onChange = () => {
        if (active) {
            alert('are you suyre')
        } else {
            setModal(true)
        }
    }

    const uplodHorseImages = async (images) => {
        const imagesPromises = []
        const imagesId = []
    
        for (const img of images) {
            try {
                let fm = new FormData();
                fm.append('image', img);
        
                const promise = axios.post('/api/images', fm, {
                    headers: { 'Content-Type': 'multipart/form-data' },
                });
        
                imagesPromises.push(promise);
            } catch (error) {
                console.error('Error uploading image:', error);
            }
        }
    
        try {
            const responses = await Promise.all(imagesPromises);
        
            responses.forEach((img) => {
                imagesId.push(img.data.imageId);
            });
        } catch (error) {
            console.error('Error processing responses:', error);
        }
    
        return imagesId
    
    }
    


    const handleCreateBarbershop = async () => {

        if (!nameRef.current.value || !phoneRef.current.value || !stateRef.current.value || !cityRef.current.value || !latitudeRef.current.value || !longitudeRef.current.value) {
            return addNewNotifcation('Please fill in all fields', 'warning')
        } else if (isAnyServiceEmpty(services)) {
            return addNewNotifcation('Please fill in all services fields', 'warning')
        } else if (isAnyBarberEmpty(barbers)) {
            return addNewNotifcation('Please fill in all barbers fields', 'warning')
        } else if (isAnyFieldEmptyForOpenDays(business)) {
            return addNewNotifcation('Please fill in all business hours fields', 'warning')
        } else if (!selectedImgs.length > 0) {
            return addNewNotifcation('Please add at least one image', 'warning')
        } else if (!isValidLatitude(latitudeRef.current.value)) {
            return addNewNotifcation('Please add valid latitude', 'warning')
        } else if (!isValidLongitude(longitudeRef.current.value)) {
            return addNewNotifcation('Please add valid longitude', 'warning')
        }

        setBtnLoading(true)

        try {

            // upload images and get their ids in array
            const images = await uplodHorseImages(selectedImgs)
            const barbershopObj = {
                owner: user._id,
                city: cityRef.current.value,
                state: stateRef.current.value,
                name: nameRef.current.value,
                phone: phoneRef.current.value,
                businesHours: business,
                services: services,
                barbers: barbers,
                coordinates: [latitudeRef.current.value, longitudeRef.current.value],
                images: images
            }

            // console.log('barbershopObj: ', barbershopObj);

            const res = await axios.post('api/barbershop', barbershopObj)
            console.log('res: ', res);

            const updateUser = await axios.put(`api/auth/update-user/${user._id}`, {business: true})
            console.log('updateUser: ', updateUser);

            addNewNotifcation('Barbershop added succssfully', 'succss')
            setModal(false)
            setActive(false)

        } catch(err) {
            console.log('error: ', err);
        } finally {
            setBtnLoading(false)
        }

    }

    const handleCancel = () => {

        nameRef.current.value = ''
        phoneRef.current.value = ''
        stateRef.current.value = ''
        cityRef.current.value = ''
        latitudeRef.current.value = ''
        longitudeRef.current.value= ''
        setSelectedImgs([])

        setModal(false)

    }

    return (
        <>
        
        <button onClick={onClick} className={`flex items-center justify-between gap-5 cursor-pointer py-2 px-3 rounded no-underline ${textColor} w-full relative hover:bg-secondaryColorHover `}>
            {/* <div className='absolute left-0 w-4 h-4/5 bg-primary rounded-full' /> */}
            {/* <i className={`text-primaryColor ${icon}`}></i> */}
            <span className='flex font-[400]'> {name} </span>
            <Switch onChange={onChange} active={active} />
        </button>
        <Modal setOpenModal={setModal} $isOpen={modal}>
            <Modal.Header>
                Add Barbershop
            </Modal.Header>
            <Modal.Body>
                {/* <button onClick={() => setActive(true)}>ok</button> */}
                <div className="felx flex-grow">
                    <form className="flex flex-grow flex-col">
                        <ul className="flex flex-col gap-3">
                            <li className='flex w-full gap-4 flex-wrap'>
                                <SettingInput label='Barbershop Name' className={'flex-auto max-w-[400px]'}>
                                    <input ref={nameRef} className='p-3 border border-gray-200 rounded-md' type="text" name="name"/>
                                </SettingInput>
                                <SettingInput label='Phone Number' className={'flex-auto max-w-[400px]'}>
                                    <input ref={phoneRef} className='p-3 border border-gray-200 rounded-md' type="text" name="phone"/>
                                </SettingInput>
                            </li>
                            <li className='flex w-full gap-4 flex-wrap'>
                                <SettingInput label='State' className={'flex-auto max-w-[400px]'}>
                                    <select className="w-full flex p-3 rounded border" ref={stateRef} name="states">
                                        {malayStates.map((state) => (
                                            <option key={state} className="" value={state}> 
                                                {state} 
                                            </option>
                                        ))}
                                    </select>
                                </SettingInput>
                                <SettingInput label='City' className={'flex-auto max-w-[400px]'}>
                                    <input ref={cityRef} className='p-3 border border-gray-200 rounded-md' type="text" name="city"/>
                                </SettingInput>
                            </li>
                            <li className='flex w-full gap-2 flex-wrap mt-3  py-4 rounded'>
                                <div className="flex gap-2 items-center">
                                <span className="text-gray-500"> Latitude & Longitude </span>
                                    <i className="fa fa-question-circle location-modal" aria-hidden="true">
                                        <span className="location-description"> 
                                            Latitude and longitude are coordinates used to specify locations on the Earth's surface. Check 
                                            <a target="_blank" href="https://support.google.com/maps/answer/18539?hl=en&co=GENIE.Platform%3DDesktop">
                                                https://support.google.com/maps
                                            </a>
                                        </span>
                                    </i>
                                </div>
                                <div className="flex w-full gap-4">
                                <SettingInput label='Latitude' className={'flex-auto max-w-[400px]'}>
                                    <input ref={latitudeRef} className='p-3 border border-gray-200 rounded-md' type="text" name="city"/>
                                </SettingInput>
                                <SettingInput label='Longitude' className={'flex-auto max-w-[400px]'}>
                                    <input ref={longitudeRef} className='p-3 border border-gray-200 rounded-md' type="text" name="city"/>
                                </SettingInput>
                                </div>
                            </li>
                            
                            {/* Business Hours */}
                            <li className="flex w-full gap-2 flex-wrap mt-3  py-4 rounded">
                                <div className="flex w-full flex-col gap-3">
                                    <label className="font-[400] text-[18px] text-gray-500"> Business Hours </label>
                                    <Business business={business} setBusiness={setBusiness} />
                                </div>
                            </li>

                            {/* services */}
                            <li className="flex w-full gap-2 flex-wrap mt-3  py-4 rounded">
                                <div className="flex w-full flex-col gap-3">
                                    <label className="font-[400] text-[18px] text-gray-500"> Services </label>
                                    <Services services={services} setServices={setServices} />
                                </div>
                            </li>

                            {/* Barbers */}
                            <li className="flex w-full gap-2 flex-wrap mt-3  py-4 rounded">
                                <div className="flex w-full flex-col gap-3">
                                    <label className="font-[400] text-[18px] text-gray-500"> Barbers </label>
                                    <Barbers barbers={barbers} setBarbers={setBarbers} />
                                </div>
                            </li>

                            {/* media */}
                            <li className="flex w-full gap-2 flex-wrap mt-3  py-4 rounded">
                                <div className="flex w-full flex-col gap-3">
                                    <label className="font-[400] text-[18px] text-gray-500"> Barbershop Media </label>
                                    <MediaUploader 
                                    selectedImgs={selectedImgs}
                                    setSelectedImgs={setSelectedImgs} />
                                </div>
                            </li>
                        </ul>
                    </form>
                </div>
                
            </Modal.Body>
            <Modal.Footer>

                <div className="flex  justify-end">
                    <div className="w-[40%] flex gap-2">
                        <button onClick={handleCancel} className="seconday-button"> Cancel </button>
                        <button disabled={btnLoading} onClick={handleCreateBarbershop} className="primary-button"> Create </button>
                    </div>
                </div>
            </Modal.Footer>
        </Modal>
        </>
    )
}
