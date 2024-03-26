import React, { useState } from 'react'
import AsideMenu from './AsideMenu'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import settingsMenu from '../../../data/settingsMenu'
import ProfileInfo from './ProfileInfo'
import ChangePass from './ChangePass'
import Switch from './Switch'
import SettingSwitch from './SwitchBusiness'


export default function Profile() {


    return (
        <div className='flex flex-grow'>
            <AsideComponent />
            <div className='flex flex-grow p-2'>
                <div className='pl-[6%] pr-6 my-[4rem] flex flex-grow flex-col'>
                    <div className='w-full my-4 flex'>
                        <h3 className='text-2xl'> My Profile </h3>
                    </div>

                    {/* user profle */}
                    <ProfileInfo />
                    
                    {/* user password */}
                    <ChangePass />

                </div>
            </div>
        </div>
    )
}

export const AsideComponent = () => {
    const [showModal, setShowModal] = useState(false)

    const handleSwitch = () => {
        setShowModal(!showModal)
    }

    return (
        <AsideMenu>
            {settingsMenu.map((item) => (
                <SettingsSection key={item.title} {...item} />
            ))}
            {/* <SettingsSection key={item.title} {...item} /> */}
            <li className='mt-[5rem] border-t-0 py-2'>
                <SettingSwitch onClick={handleSwitch} name='Business Account' icon='fa fa-user' />
                <SettingSidebar path='/api/auth/logout' name='Logout' icon='fa fa-user' />
            </li>
        </AsideMenu>
    )
}

export const SettingSection = ({ title, children }) => {
    
    return (
        <div className='flex flex-grow bg-gray-0 border border-gray-200 rounded p-4 mt-6'>
            <div className='p-2 flex max-w-[180px]'>
                <h4 className='text-xl font-[300]'>
                    {title}
                </h4>
            </div>
            <div className='flex flex-grow pl-[3rem] py-2'>
                {children}
            </div>
        </div>
    )
}


export const SettingInput = ({ label, className, children }) => {
    
    return (
        <div className={`flex flex-col gap-2 min-w-[300px] ${className}`}>
            <label className='font-nunito'> {label} </label>
            {children}
        </div>
    )
}

export const SettingsSection = ({ list, title }) => {

    return (
        <li className="flex flex-col"> 
            <span className='flex w-full text-[13px] my-[4px] text-gray-300 font-[300]'> {title} </span>
            <div className='flex flex-col flex-grow w-full'>
                <ul className='flex flex-col gap-1'>
                    {list.map((item) => (
                        <li key={item.path}>
                           <SettingSidebar {...item} /> 
                        </li>
                    ))}
                </ul>
            </div>
        </li>
    )
}

const SettingSidebar = ({ name, path, icon }) => {
    const loaction = usePathname()

    const textColor = name === 'Logout' ? 'text-[#721c24]' : 'text-primaryColor'

    return (
        <Link href={path} className={`flex items-center gap-5 cursor-pointer py-2 px-3 rounded no-underline ${textColor} w-full relative hover:bg-secondaryColorHover  ${loaction === path ? 'bg-secondaryColorHover' : ''}`}>
            <div className='absolute left-0 w-4 h-4/5 bg-primary rounded-full' />
            <i className={`text-primaryColor ${icon}`}></i>
            <span className='flex font-[400]'> {name} </span>
        </Link>
    )
}