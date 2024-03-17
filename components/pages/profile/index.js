import React from 'react'
import AsideMenu from './AsideMenu'
import { usePathname } from 'next/navigation'
import Link from 'next/link'


export default function Profile() {

    const data = [{ name: 'Profile', path: '/settings/profile', icon: <h1></h1> }]
    
    return (
        <div className='flex flex-grow'>
            <AsideMenu>
                <SettingsSection title='Smart Contract Dashboard' list={data} />
                <SettingsSection title='Smart Contract Dashboard' list={data} />
            </AsideMenu>
            <div className='flex flex-grow p-2'>
                <div className='pl-[6%] pr-6 mt-[4rem] flex flex-grow flex-col'>
                    <div className='w-full my-4 flex'>
                        <h3 className='text-2xl'> My Profile </h3>
                    </div>

                    <SettingSection title={'Profile Information'}>
                        <div className='flex flex-grow'>
                            <ul className='flex flex-col'>
                                <li>
                                    
                                </li>
                            </ul>
                        </div>
                    </SettingSection>
                </div>
            </div>
        </div>
    )
}

const SettingSection = ({ title, children }) => {
    
    return (
        <div className='flex flex-grow bg-gray-0 border border-gray-200 rounded p-4'>
            <div className='p-2 flex max-w-[180px]'>
                <h4 className='text-xl font-[300]'>
                    {title}
                </h4>
            </div>
            <div className='flex flex-grow p-3'>
                {children}
            </div>
        </div>
    )
} 

export const SettingsSection = ({ list, title }) => {

    return (
        <li className="flex flex-col"> 
            <span className='flex w-full text-[13px] my-[4px] text-gray-300 font-[300]'> {title} </span>
            <div className='flex flex-col flex-grow w-full'>
                <ul className='flex flex-col gap-5'>
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

    return (
        <Link href={path} className={`flex items-center gap-5 cursor-pointer py-2 px-3 rounded-md no-underline text-primaryColor w-full relative hover:bg-gray-300  ${loaction === path ? 'bg-[#ededed]' : ''}`}>
            <div className='absolute left-0 w-4 h-4/5 bg-primary rounded-full' />
            <span className='flex font-[400]'> {icon} </span>
            <span className='flex font-[400]'> {name} </span>
        </Link>
    )
}