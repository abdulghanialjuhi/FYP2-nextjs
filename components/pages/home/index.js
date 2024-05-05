import Image from 'next/image'
import React, { useContext, useEffect, useState } from 'react'
import AnimatedInput from '../../common/StyledInput'
import states from '../../../data/states'
import { Context } from '../../../context/GlobalState'
import Dropdown from '../../common/SelectDropdown'
import { useRouter } from 'next/router'
import axios from 'axios'
import { SectionLoadingIndicator } from '../../common/LoadingIndicator'
import { BarberShopCard } from '../barbershops'
import { fetchImages } from '../../../utils/horseImagesUtils'

export default function Home() {

    // const [name, setName] = useState('')
    // const [state, setState] = useState('')
    // const [city, setCity] = useState('')
    // const [services, setServices] = useState([
    //     { id: 1, name: "Haircut", checked: false },
    //     { id: 2, name: "Beard Trim", checked: false },
    //     { id: 3, name: "Hot Towel Shave", checked: false },
    //     { id: 4, name: "Hair Coloring", checked: false },
    //     { id: 5, name: "Scalp Treatment", checked: false },
    //     { id: 6, name: "Facial Treatment", checked: false }
    // ])

    const [location, setLocation] = useState(false)
    const [latitude, setLatitude] = useState('')
    const [longitude, setLongitude] = useState('')
    const [nearLoading, setNearLoading] = useState(true)
    const [featuredBarbershops, setFeaturedBarbershops] = useState([])

    const { actions, filter } = useContext(Context)
    const router = useRouter()

    // useEffect(() => console.log('filter: ', filter), [filter])

    useEffect(() => {

    
        getLocation();
    }, []); // Empty dependency array ensures useEffect runs only once on mount

    const getLocation = () => {
        if ("geolocation" in navigator) {
          // Ask for permission to access location
          navigator.geolocation.getCurrentPosition(
            (position) => {
                setLocation(true)

                const { latitude, longitude } = position.coords;
                setLatitude(latitude)
                setLongitude(longitude)
                console.log("Latitude:", latitude);
                console.log("Longitude:", longitude);

                axios.get('/api/barbershop/nearby', {params: {latitude, longitude, maxDistance: 1000}})
                .then(async(res) => {
                    console.log('res: ', res);
                    const barbersArr = await fetchImages(res?.data)
                    setFeaturedBarbershops(barbersArr)

                }).catch((error) => {
                    console.log('error: ', error);
                }).finally(() => {
                    setNearLoading(false)
                })

            },
            (error) => {
                console.error("Error getting location:", error.message);
            }
          );
        } else {
          console.log("Geolocation not available");
          // Handle geolocation not available
        }
    };

    const handleSearchChange = (name, value) => {

        actions({type: 'SET_FILTER', payload: (prevState => ({
            ...prevState,
            [name]: value
          }))
        })
    }

    return (
        <div className='flex flex-grow flex-col'>
            {/* <div className="absolute inset-0 bg-gradient-to-b from-[#2E2E2E] to-transparent z-30"></div> */}

            <section className='flex flex-grow h-screen w-screen'>
                <div className='flex absolute w-screen h-screen top-0'>
                    <div className="absolute bottom-0 left-0 right-0 top-0 w-full bg-[rgb(35,39,51)] opacity-60 z-20"/>
                    <div className="fixed top-0  w-full h-full">
                        <Image src={'/barber-banner.jpg'} alt='background-img' layout='fill' className='w-full min-w-[1000px] h-full min-h-[600px]' />
                    </div>

                </div>

                <div className='flex flex-grow z-20 mt-[8rem]'>
                    <div className='w-full max-w-[1200px] mx-auto flex h-full text-white justify-between items-center'>
                        <h1 className='text-[55px] font-[800] text-secondaryColor text-justify'> Step into Style, Reserve Your Barber Chair! </h1>

                        <div className='w-full flex justify-end mt-4'>   
                            {/* <button className='py-2 px-4 rounded bg-secondaryColor text-black hover:bg-secondaryColorHover'> Book now </button> */}
                            <div className='w-[480px] h-[430px] bg-gray-0 rounded p-6 flex shadow-custom'>
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

                                    <div className='flex mt-auto w-full'>
                                        <button onClick={() => router.push('/barbershops')} className='primary-button'>
                                            Search
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            <section className='flex flex-grow h-screen w-screen bg-gray-100 z-20'>
                <div className='flex flex-col w-full mt-[4rem]'>
                    <h1 className='text-3xl font-bold text-center'> Featured Barbershops Near You! </h1>
                    
                    <div className='flex w-full mt-3 justify-center'>
                        {!location ? (
                            <div className='w-full flex max-w-[800px] mx-auto justify-center'>
                                <div className='flex flex-col mt-4'>
                                    Change browser settings to allow location access to get featured barbershops near you

                                    {/* <button className='font-[500] mt-3 hover:text-gray-400' onClick={getLocation}>Allow</button> */}
                                </div>
                            </div>
                        ) : nearLoading ? (
                            <SectionLoadingIndicator />
                        ) : !featuredBarbershops.length > 0 ? (
                            <div className='flex w-full max-w-[800px] mx-auto justify-center'>
                                no featured barberhsops near you!
                            </div>
                        ) : ( 
                            <div className='flex w-full max-w-[800px] mx-auto'>
                                <div className='flex w-full flex-col gap-3'>
                                    {featuredBarbershops.slice(0, 3).map((barbershop) => (
                                        <BarberShopCard key={barbershop._id} {...barbershop} />
                                    ))}
                                </div>
                            </div>
                        )}  
                    </div>
                </div>
            </section>

        </div>
    )
}


export const ServicesSelect = () => {

    const { actions, filter } = useContext(Context)

    const handleSelect = (ids) => {
        const updatedServices = filter.services.map(service => {
          if (ids.includes(service.id)) {
            return { ...service, checked: true };
          } else {
            return service;
          }
        });
      
        actions({type: 'SET_FILTER', payload: (prevState => ({
            ...prevState,
            services: updatedServices
          }))
        })

        return updatedServices;
    }
    

    const handleOnClose = () => {

    }

    const handlenSelectName = () => {

    }

    return (
        <div className='flex w-full'>
            <Dropdown title='Services' value={'checked'} options={filter.services} onSelect={handleSelect} onSelect_name={handlenSelectName} onClose={handleOnClose} />
        </div>
    )
}