import React, { useContext, useEffect, useRef, useState } from 'react'
import { SettingInput, SettingSection } from '.'
import { Context } from '../../../context/GlobalState'
import axios from 'axios'

export default function ProfileInfo() {


    const [profile, setProfile] = useState(null);
    const [newProfile, setNewProfile] = useState(null);
    
    const { user, addNewNotifcation } = useContext(Context)
    const [btnLoading, setBtnLoading] = useState(false)

    const nameRef = useRef()
    const emailRef = useRef()
    const phoneRef = useRef()
    
    useEffect(() => {
        nameRef.current.value = user.fullName
        emailRef.current.value = user.email
        phoneRef.current.value = user.phoneNumber

        if (user.profileImg){
            setProfile(user.profileImg)
        }

    }, [])


    const handleUpdateProfile = async () => {

        const newData = {
            email: emailRef.current.value,
            fullName: nameRef.current.value,
            phoneNumber: phoneRef.current.value,
            // profilePic: "6608279fba32d0413b249dc7"
        }

        setBtnLoading(true)

        if (newProfile) {
            let fd = new FormData()
            fd.append('image', profile)

            try {
                const imgRes =  await axios.post(`api/images`, fd, {headers: { "Content-Type": "multipart/form-data" }})
                console.log('imgRes: ', imgRes);
                newData['profilePic'] = imgRes.data.imageId
            } catch (error) {
                console.log('error: ', error);
            }
        }

        console.log('newData: ', newData);
        axios.put(`api/auth/update-user/${user._id}`, newData)
        .then((res) => {
            console.log('res: ', res);

            addNewNotifcation('Profile Updated Successfully', 'success')
        }).catch((error) => {
            console.log('error: ', error);
            addNewNotifcation('Something Went Wrong', 'danger')
        }).finally(() => {
            setBtnLoading(false)
        })

    }


    const uploadProfile = (e) => {
        setProfile(e.target.files[0]);
        setNewProfile(e.target.files[0]);
    }

    return (
        <SettingSection title={'Profile Information'}>
            <div className='flex flex-grow flex-col'>
                <ul className='flex flex-col w-full'>
                    <li className='flex w-full gap-4 flex-wrap'>
                        <div className='mb-4'>
                            <div className='wrap-custom-file'>
                                <input
                                    type="file"
                                    id="image1"
                                    accept="image/png, image/gif, image/jpeg"
                                    onChange={uploadProfile}
                                />
                                <label
                                    style={
                                        profile !== null
                                            ? {
                                                backgroundImage: `url(${URL.createObjectURL(
                                                    profile
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
                        </div>
                    </li>
                    <li className='flex w-full gap-4 flex-wrap'>
                        <SettingInput label='Full Name' className={'flex-auto max-w-[400px]'}>
                            <input ref={nameRef} className='p-3 border border-gray-200 rounded-md' type="text" name="name"/>
                        </SettingInput>
                        <SettingInput label='Email' className={'flex-auto max-w-[400px]'}>
                            <input ref={emailRef} className='p-3 border border-gray-200 rounded-md' type="text" name="name"/>
                        </SettingInput>
                        <SettingInput label='Phone Number' className={'flex-auto max-w-[400px]'}>
                            <input ref={phoneRef} className='p-3 border border-gray-200 rounded-md' type="text" name="phone"/>
                        </SettingInput>
                    </li>
                </ul>

                <div className='mt-8 flex w-full p-3 justify-end'>
                    <div className='w-[200px]'>
                        <button disabled={btnLoading} onClick={handleUpdateProfile} className='primary-button'>
                            Update Profile
                        </button>
                    </div>
                </div>
            </div>
        </SettingSection>
    )
}
