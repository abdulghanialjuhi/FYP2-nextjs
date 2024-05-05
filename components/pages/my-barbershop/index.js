import React, { useContext, useEffect, useRef, useState } from "react";
import { AsideComponent, SettingInput, SettingSection } from "../profile";
import { useBarber } from "../../../hooks/useBarberByOwner";
import { Context } from "../../../context/GlobalState";
import { SectionLoadingIndicator } from "../../common/LoadingIndicator";
import AnimatedInput from "../../common/StyledInput";
import states from "../../../data/states";
import MediaUploader from "./MediaLoader";
import { isAnyServiceEmpty, uplodHorseImages } from "../profile/SwitchBusiness";
import axios from 'axios'
import Business from "../profile/BusinessHours";
import Services from "../profile/Services";

export default function MyBarbershop() {

    const { user } = useContext(Context)
    const { barber, setBarber, loading, error} = useBarber(user._id)

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
                    <div className='pl-[6%] pr-6 my-[4rem] flex flex-grow flex-col'>
                        <div className='w-full my-4 flex'>
                            <h3 className='text-2xl'> My Barbershop </h3>
                        </div>

                        {/* Barberhop Info */}
                        <BarberhopInfo barbershop={barber} setBarbershop={setBarber} />
                        
                        {/* barbershop busniess hours */}
                        <BarbershopServices barbershop={barber} />

                        {/* barbershop busniess hours */}
                        <BarbershopHours barbershop={barber} />

                    </div>
                )}
            </div>
        </div>
    )
}


const BarberhopInfo = ({ barbershop, setBarbershop }) => {

    const [selectedImgs, setSelectedImgs] = useState([])
    const [btnLoading, setBtnLoading] = useState(false)
    const { addNewNotifcation } = useContext(Context)

    const handleInputChange = (type, value) => {
        setBarbershop(prev => ({...prev, [type]: value}))
    }

    useEffect(() => {
        setSelectedImgs(barbershop?.images || [])
    }, [])

    const handleCoordinatesChange = (index, value) => {
        if (index === 0) {
            setBarbershop(prev => ({...prev, coordinates: [value, prev.coordinates[1]]}))
        } else if (index === 1) {
            setBarbershop(prev => ({...prev, coordinates: [prev.coordinates[0], value]}))
        }
    }

    // useEffect(() => console.log('barbershop: ', barbershop), [barbershop])

    const handleUpdateBarbershopInfo = async () => {


        setBtnLoading(true)

        // update images
        const newImages = await uplodHorseImages(selectedImgs.filter((item) => item.new === true).map((item) => (item.blob)))
        const currentImages = selectedImgs.filter((item) => !item.new).map((item) => (item.id))
        const combinedImages = currentImages.concat(newImages)

        const copyObj = {...barbershop}
        copyObj['images'] = combinedImages
        copyObj['owner'] = copyObj.owner._id
        copyObj['barbers'] =  copyObj.barbers.map((item) => ({...item, photo: item.photo?.id})),
        
        console.log('data: ', copyObj);

        axios.put(`/api/barbershop/${barbershop._id}`, copyObj)
        .then(async (res) => {
            console.log('res: ', res);
            addNewNotifcation('Barbershop updated successfully', 'success')
        }).catch((error) => {
            console.log('error: ', error);
        }).finally(() => {
            setBtnLoading(false)
        })
        
    }


    return (
        <SettingSection title={'Profile Information'}>
            <div className='flex flex-grow flex-col'>
                <ul className='flex flex-col w-full gap-3'>
                    <li className='flex w-full gap-4 flex-wrap'>
                        <AnimatedInput value={barbershop?.name} onChange={(e) => handleInputChange('name', e.target.value)} placeholderName='Barbershop Name' /> 
                    </li>
                    <li className='flex w-full gap-4 flex-wrap'>
                        <div className="flex-grow">
                            <AnimatedInput value={barbershop?.city} onChange={(e) => handleInputChange('city', e.target.value)} placeholderName='City' /> 
                        </div>
                        <div className="flex-grow">
                            <AnimatedInput value={barbershop?.phone} onChange={(e) => handleInputChange('phone', e.target.value)} placeholderName='Phone' /> 
                        </div>
                    </li>
                    <li className='flex w-full gap-4 flex-wrap mt-4'>
                        <div className="flex-grow">
                            <AnimatedInput value={barbershop?.coordinates[0]} onChange={(e) => handleCoordinatesChange(0, e.target.value)} placeholderName='Longitude' />
                        </div>
                        <div className="flex-grow">
                            <AnimatedInput value={barbershop?.coordinates[1]} onChange={(e) => handleCoordinatesChange(1, e.target.value)} placeholderName='Latitude' /> 
                        </div>
                    </li>
                    <li className='flex w-full gap-4 flex-wrap mt-3'>
                        <label htmlFor="state"> State </label>
                        <select value={barbershop?.state} onChange={(e) => handleInputChange('state', e.target.value)} name="state" id="state" className="flex w-full p-3 border border-[#e5e5e5] rounded-[0.375rem]">
                            {states.map((item) => (
                                <option key={item} value={item}> {item} </option>
                            ))}
                        </select>
                    </li>

                    <li className='flex w-full gap-4 flex-wrap mt-4'>
                        <div className="flex w-full flex-col gap-3">
                            <label className="font-[400] text-[18px] text-gray-500"> Barbershop Media </label>
                            <MediaUploader
                            blob={true}
                            selectedImgs={selectedImgs}
                            setSelectedImgs={setSelectedImgs} />
                        </div>
                    </li>

                </ul>

                <div className='mt-8 flex w-full p-3 justify-end'>
                    <div className='w-[200px]'>
                        <button disabled={btnLoading} onClick={handleUpdateBarbershopInfo} className='primary-button'>
                            Update Barbershop
                        </button>
                    </div>
                </div>
            </div>
        </SettingSection>
    )
}


const BarbershopHours = ({ barbershop }) => {

    const [busines, setBusines] = useState([])
    const [btnLoading, setBtnLoading] = useState(false)
    const { addNewNotifcation } = useContext(Context)

    useEffect(() => {
        setBusines(barbershop?.businesHours)
    }, [])

    const handleUpdateBusinesHours = () => {

        const businesObj = {
            businesHours: busines
        }

        axios.put(`/api/barbershop/${barbershop._id}`, businesObj)
        .then(async (res) => {
            console.log('res: ', res);
            addNewNotifcation('Barbershop updated successfully', 'success')
        }).catch((error) => {
            console.log('error: ', error);
        }).finally(() => {
            setBtnLoading(false)
        })
    }

    return (
        <SettingSection title={'Busines Hours'}>
            <div className='flex flex-grow flex-col'>
                <Business business={busines} setBusiness={setBusines} />


                <div className='mt-8 flex w-full p-3 justify-end'>
                    <div className='w-[200px]'>
                        <button disabled={btnLoading} onClick={handleUpdateBusinesHours} className='primary-button'>
                            Update Busines Hours
                        </button>
                    </div>
                </div>
            </div>

        </SettingSection>
    )
}

const BarbershopServices = ({ barbershop }) => {

    const [services, setServices] = useState([])
    const [btnLoading, setBtnLoading] = useState(false)
    const { addNewNotifcation } = useContext(Context)

    // console.log('barbershop11: ', barbershop);
    useEffect(() => {
        setServices(barbershop?.services || [])
    }, [])

    // useEffect(() => console.log('services: ', services), [services])

    const handleUpdateServices = () => {

        if (isAnyServiceEmpty(services)) {
            return addNewNotifcation('Please fill in all services fields', 'warning')

        }
        const businesObj = {
            services: services
        }

        axios.put(`/api/barbershop/${barbershop._id}`, businesObj)
        .then(async (res) => {
            console.log('res: ', res);
            addNewNotifcation('Barbershop updated successfully', 'success')
        }).catch((error) => {
            console.log('error: ', error);
        }).finally(() => {
            setBtnLoading(false)
        })
    }

    return (
        <SettingSection title={'Services'}>
            <div className='flex flex-grow flex-col'>
                <Services services={services} setServices={setServices} />


                <div className='mt-8 flex w-full p-3 justify-end'>
                    <div className='w-[200px]'>
                        <button disabled={btnLoading} onClick={handleUpdateServices} className='primary-button'>
                            Update Services
                        </button>
                    </div>
                </div>
            </div>

        </SettingSection>
    )
}