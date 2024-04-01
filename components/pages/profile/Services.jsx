import React, { useContext, useEffect, useState } from "react";
import AnimatedInput from "../../common/StyledInput";
import { Context } from "../../../context/GlobalState";


export default function Services({ services, setServices }) {

    const AddService = () => {
        const newServiceObj = {
            service: '',
            price: 0,
            duration: '0:0'
        }

        setServices(prev => ([...prev, newServiceObj]))
    }
    
    const deleteService = () => {
        if (services.length <= 1) return

        setServices(prev => (prev.slice(0, -1)))
    }


    return (
        <div className="flex w-full flex-col">
            <ul className="flex w-full flex-col gap-3">
                {services.map((service, i) => (
                    <ServiceRow key={i} {...service} index={i} services={services} setServices={setServices} />
                ))}
            </ul>
            <div className="flex w-full justify-end mt-5">
                <div className="flex  py-2">
                    <div onClick={deleteService} className="p-2 flex cursor-pointer  bg-secondaryColor">
                        <i className="fa fa-minus" aria-hidden="true"></i>
                    </div>
                    <div onClick={AddService} className="p-2 flex cursor-pointer text-gray-0 bg-primaryColor">
                        <i className="fa fa-plus" aria-hidden="true"></i>
                    </div>
                </div>
            </div>
        </div>
    )
}

const ServiceRow = ({ index, service, price, duration, setServices }) => {

    const { addNewNotifcation } = useContext(Context)
    const [hours, setHours] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const MAX_HOURS = 3

    const handleHoursChange = (e) => {
        const value = parseInt(e.target.value);
        if (value > MAX_HOURS) {
            setHours(MAX_HOURS);
            addNewNotifcation(`Max service hours is ${MAX_HOURS}`, 'warning')
        } else {
            setHours(value >= 0 ? value : 0);
        }
    };

    const changeService = (name, value) => {
        setServices(prev => {
            return prev.map((obj,i) => {
                if (index === i) {
                    return {...obj, [name]: value};
                }
                return obj;
            });
        });
    }

    useEffect(() => {
        changeService('duration', `${hours}:${minutes}`)
    }, [hours, minutes])

    const handleMinutesChange = (e) => {
        const value = parseInt(e.target.value);
        if (value >= 0 && value < 60) {
          setMinutes(value);
        } else if (value >= 60) {
          setMinutes(59); // Cap the minutes at 59
        } else {
          setMinutes(0); // Set to 0 if negative value
        }
    };

    return (
        <li className="flex w-full gap-3">
            <SettingInput label='.' className={'flex flex-grow'}>
                <AnimatedInput placeholderName='service' value={service} onChange={e => changeService('service', e.target.value)} />
            </SettingInput>
            <SettingInput label='.' className={'flex w-full max-w-[150px]'}>
                <AnimatedInput placeholderName='Price' value={price} type="number" onChange={e => changeService('price', e.target.value)} />
            </SettingInput>
            <SettingInput label='Duration' className={'flex-auto max-w-[250px]'}>
                <div className="flex w-full items-center gap-1 max-w-[250px]">
                    <AnimatedInput placeholderName='Hours' type="number" value={duration.split(':')[0]} onChange={handleHoursChange} />
                    :
                    <AnimatedInput placeholderName='Minutes' type="number" value={duration.split(':')[1]} onChange={handleMinutesChange} />
                </div>
            </SettingInput>
            {/* <div className="flex w-full max-w-[150px]">
            </div> */}
            
            {/* <SettingInput label='Price' className={'flex-auto max-w-[150px]'}>
                <input onChange={e => changeService('price', e.target.value)} type="number" className="flex p-3 border border-gray-200 rounded-md" value={price} />
            </SettingInput>
            <SettingInput label='Duration' className={'flex-auto max-w-[250px]'}>
                <div className="flex items-center gap-1 w-full">
                    <input value={duration.split(':')[0]} onChange={handleHoursChange} placeholder="Hours" type="number" className="flex max-w-[120px]  p-3 border border-gray-200 rounded-md" />
                    <span>:</span>
                    <input value={duration.split(':')[1]} onChange={handleMinutesChange} placeholder="Minutes" type="number" className="flex max-w-[120px]  p-3 border border-gray-200 rounded-md" />
                </div>
            </SettingInput> */}
        </li>
    )
}



export const SettingInput = ({ label, className, children }) => {
    
    return (
        <div className={`flex flex-col gap-2 ${className}`}>
            <label className={`font-nunito ${label === '.' ? 'text-gray-0' : 'text-gray-400'}`}> {label}{"  "} </label>
            {children}
        </div>
    )
}