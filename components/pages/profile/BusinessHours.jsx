import React, { useEffect, useState } from "react";
import AnimatedInput from "../../common/StyledInput";


export default function Business({ business, setBusiness }) {

    // useEffect(() => {
    //     console.log('business: ', business);
    // }, [business])

    return (
        <div className="flex w-full flex-col">
            <ul className="flex w-full flex-col gap-3">
                {business?.map((barber, i) => (
                    <BusinessRow key={i} {...barber} index={i} business={business} setBusiness={setBusiness} />
                ))}
            </ul>
        </div>
    )
}

const BusinessRow = ({ index, day, openTime, closeTime, isOpen, setBusiness }) => {

    const changeBarber = (name, value) => {
        setBusiness(prev => {
            return prev.map((obj,i) => {
                if (index === i) {
                    return {...obj, [name]: value};
                }
                return obj;
            });
        });
    }

    const handleIsOpen = () => {
        setBusiness(prev => {
            return prev.map((obj,i) => {
                if (index === i) {
                    return {...obj, 'isOpen': !isOpen, openTime: '', closeTime: ''};
                }
                return obj;
            });
        });
    }

    return (
        <li className="flex w-full gap-3">
            <input type="checkbox" checked={isOpen} onChange={handleIsOpen} />
            <AnimatedInput placeholderName='Day' disabled value={day} onChange={e => changeBarber('day', e.target.value)} />
            <AnimatedInput placeholderName='Open Time' disabled={!isOpen} type='time' value={openTime} onChange={e => changeBarber('openTime', e.target.value)} />
            <AnimatedInput placeholderName='Close Time' disabled={!isOpen} type='time' value={closeTime} onChange={e => changeBarber('closeTime', e.target.value)} />
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