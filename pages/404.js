import React from 'react'
import Link from 'next/link'

export default function NotFound() {


    return (
        <div className='w-full max-w-[600px] mx-auto flex flex-col pt-12 md:pt-20 items-center h-full'>
            <h2> Page Not Found </h2>

            <Link href='/'>
                {/* <a className='a_link mt-6'> */}
                    Go Home
                {/* </a>     */}
            </Link>
        </div>
    )
}