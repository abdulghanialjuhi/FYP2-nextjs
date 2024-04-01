import React, { useEffect, useState } from "react";
import AnimatedInput from "../../common/StyledInput";


export default function Barbers({ barbers, setBarbers }) {

    const AddBarber = () => {
        const newBarberObj = {
            name: '',
            photo: null
        }

        setBarbers(prev => ([...prev, newBarberObj]))
    }
    
    const deleteBarber = () => {
        if (barbers.length <= 1) return

        setBarbers(prev => (prev.slice(0, -1)))
    }


    return (
        <div className="flex w-full flex-col">
            <ul className="flex w-full flex-col gap-3">
                {barbers.map((barber, i) => (
                    <BarberRow key={i} {...barber} index={i} barbers={barbers} setBarbers={setBarbers} />
                ))}
            </ul>
            <div className="flex w-full justify-end mt-5">
                <div className="flex  py-2">
                    <div onClick={deleteBarber} className="p-2 flex cursor-pointer  bg-secondaryColor">
                        <i className="fa fa-minus" aria-hidden="true"></i>
                    </div>
                    <div onClick={AddBarber} className="p-2 flex cursor-pointer text-gray-0 bg-primaryColor">
                        <i className="fa fa-plus" aria-hidden="true"></i>
                    </div>
                </div>
            </div>
        </div>
    )
}

const BarberRow = ({ index, name, photo, setBarbers }) => {

    const [profile,  setProfile] = useState(null)

    const changeBarber = (name, value) => {
        setBarbers(prev => {
            return prev.map((obj,i) => {
                if (index === i) {
                    return {...obj, [name]: value};
                }
                return obj;
            });
        });
    }

    return (
        <li className="flex w-full gap-3">
            <SettingInput label='.' className={'flex flex-grow'}>
                <AnimatedInput placeholderName='barber' value={name} onChange={e => changeBarber('name', e.target.value)} />
            </SettingInput>
            {/* <div className='mb-4'>
                <div className='wrap-custom-file-small w-[100] h-[100]'>
                    <input
                        type="file"
                        id="image1"
                        accept="image/png, image/gif, image/jpeg"
                        // onChange={uploadProfile}
                        onChange={e => changeBarber('photo', e.target.files[0])}
                    />
                    <label
                        style={
                            photo !== null
                                ? {
                                    backgroundImage: `url(${URL.createObjectURL(
                                        photo
                                    )})`,
                                }
                                : undefined
                        }
                        htmlFor="image1"
                    >
                        <span>
                            <i className="fa fa-upload"></i> Upload Photo{" "}
                        </span>
                    </label>
                </div>
                </div> */}
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