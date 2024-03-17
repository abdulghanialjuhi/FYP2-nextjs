import React, {useState} from 'react'
import Form from './Form'
import OwnerForm from "./OwnerForm";

export default function Signup() {

    const [showOwnerForm, setShowOwnerForm] = useState(false)
    const [userObj, setUserObj] = useState({})
    // const [first, setfirst] = useState(second)

    return (
        <div className='flex flex-gow justify-center items-center w-full'>

            <div className={`${showOwnerForm ? 'flex' : 'hidden'}`}>
                <OwnerForm user={userObj} />
            </div>
            
            <div className={`${showOwnerForm ? 'hidden' : 'flex w-full'}`}>
                <div className='w-full mx-auto flex max-w-[450px] p-4'>
                    <Form setShowOwnerForm={setShowOwnerForm} setUserObj={setUserObj} />
                </div>
            </div>

            {/* <div className='flex w-full max-w-[750px] flex-col mt-[3rem]'>
                <SignupTab isOwner={isOwner} setIsOwner={setIsOwner} />
                {isOwner ? (
                    <div className='w-full mx-auto flex max-w-[450px] p-4'>
                        <Form />
                    </div>
                ) : (
                    <div className='w-full mx-auto flex max-w-[450px] p-4'>
                        <Form />
                    </div>
                )}
            </div> */}
        </div>
    )
}

const SignupTab = ({ isOwner, setIsOwner }) => {

    return (
        <div className='w-full flex h-[40px] border border-black'>
            <div onClick={e => setIsOwner(false)} className={`flex justify-center items-center flex-grow cursor-pointer ${!isOwner ? 'bg-primaryColor text-white' : ''}`}>
                <span> Customer </span>
            </div>
            <div onClick={e => setIsOwner(true)} className={`flex justify-center items-center flex-grow cursor-pointer ${isOwner ? 'bg-primaryColor text-white' : ''}`}>
                <span> Busniess Owner </span>
            </div>

        </div>
    )
}