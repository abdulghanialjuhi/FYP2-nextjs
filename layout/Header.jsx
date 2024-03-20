import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import { useContext } from 'react';
import { Context } from '../context/GlobalState';
import { usePathname } from 'next/navigation';

export default function Header() {

    const [scrolled, setScrolled] = useState(false);
    const { isAuth } = useContext(Context)

    const location = usePathname()


    useEffect(() => {
      function handleScroll() {
        if (window.scrollY > 0) {
          setScrolled(true);
        } else {
          setScrolled(false);
        }
      }
  
      window.addEventListener('scroll', handleScroll);
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }, []);

    return (
        <div className='flex flex-col'>
            {location !== '/' && <div className='h-[80px] w-full'/>}
            <header className={`flex p-2 z-[999]  text-gray-0 h-[80px] px-8 fixed top-0 w-full transition-all duration-300 ${scrolled ? 'bg-primaryColor' : location !== '/' ? 'bg-primaryColor' : 'bg-transparent'}`}>
                <div className='flex items-center text-2xl'>
                    <a href="/">BarberBook</a>
                </div>

                <div className='flex flex-grow justify-end h-full'>
                    <ul className='flex gap-8 h-full items-center [&>*]:p-1 [&>*]:cursor-pointer'>
                        <li> <Link href='/barbershops'> Barbershops </Link> </li>
                        <li> <Link href={isAuth ? '/profile' : '/login'}> {isAuth? 'Profile' : 'Login'} </Link> </li>
                    </ul>
                </div>
                
            </header>
        </div>

    )
}
