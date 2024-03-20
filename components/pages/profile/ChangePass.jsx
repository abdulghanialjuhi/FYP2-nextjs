import React, { useContext, useRef, useState } from 'react'
import { SettingInput, SettingSection } from '.'
import { Context } from '../../../context/GlobalState'
import axios from 'axios'

export default function ChangePass() {

    const { user, addNewNotifcation } = useContext(Context)
    const [btnLoading, setBtnLoading] = useState(false)

    const passwordRef = useRef()
    const newPasswordRef = useRef()
    const confirmPasswordRef = useRef()


    const handleChangePassword = () => {

        if (newPasswordRef.current.value !== confirmPasswordRef.current.value) {
          return addNewNotifcation('New password and new confirm password does not match', 'warning')
        } else if (newPasswordRef.current.value.length < 8) {
          return addNewNotifcation('New password Must be at Least 8 Character', 'warning')
        }
        setBtnLoading(true)
    
        const passwordObj = {
            oldPassword: passwordRef.current.value,
            password: newPasswordRef.current.value,
        }
    
        axios.put(`/api/auth/update-user/${user._id}`, passwordObj)
        .then((res) => {
            console.log('res: ', res);
            addNewNotifcation('Password updated successfully', 'success')
        }).catch((error) => {
            console.log('error: ', error);
            if (error.response.status === 404) {
                addNewNotifcation('User not found', 'danger')
            } else if (error.response.status === 403){
                addNewNotifcation('Old password is not correct', 'danger')
            } else {
                addNewNotifcation('Something went wrong', 'danger')
            }
        }).finally(() => {
            setBtnLoading(false)
        })
    
      }

    return (
        <SettingSection title={'Change Password'}>
            <div className='flex flex-grow flex-col'>
                <ul className='flex flex-col w-full gap-4'>
                    <li className='flex w-full gap-4 flex-wrap'>
                        <SettingInput label='Old Password' className={'flex-auto max-w-[400px]'}>
                            <input ref={passwordRef} className='p-3 border border-gray-200 rounded-md' type="password" name="password"/>
                        </SettingInput>
                    </li>
                    <li className='flex w-full gap-4 flex-wrap'>
                        <SettingInput label='New Password' className={'flex-auto max-w-[400px]'}>
                            <input ref={newPasswordRef} className='p-3 border border-gray-200 rounded-md' type="password" name="new-password"/>
                        </SettingInput>
                        <SettingInput label='Confirm Password' className={'flex-auto max-w-[400px]'}>
                            <input ref={confirmPasswordRef} className='p-3 border border-gray-200 rounded-md' type="password" name="confirm-password"/>
                        </SettingInput>
                    </li>
                </ul>

                <div className='mt-8 flex w-full p-3 justify-end'>
                    <div className='w-[200px]'>
                        <button disabled={btnLoading} onClick={handleChangePassword} className='primary-button'>
                            Update Password
                        </button>
                    </div>
                </div>
            </div>
        </SettingSection>
    )
}
