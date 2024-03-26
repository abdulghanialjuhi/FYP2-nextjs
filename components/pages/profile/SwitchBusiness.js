import { useState } from "react"
import Switch from "./Switch"
import Modal from "../../common/Modal"
import { SettingInput } from "."
import { useRef } from "react"
import malayStates from "../../../data/states"



export default function SettingSwitch({ name, onClick, icon }) {

    const textColor = name === 'Logout' ? 'text-[#721c24]' : 'text-primaryColor'
    const [active, setActive] = useState(false)
    const [modal, setModal] = useState(false)

    const nameRef = useRef()
    const phoneRef = useRef()
    const stateRef = useRef()
    const cityRef = useRef()
    const latitudeRef = useRef()
    const longitudeRef = useRef()

    const onChange = () => {
        if (active) {
            alert('are you suyre')
        } else {
            setModal(true)
        }
    }

    return (
        <>
        
        <button onClick={onClick} className={`flex items-center justify-between gap-5 cursor-pointer py-2 px-3 rounded no-underline ${textColor} w-full relative hover:bg-secondaryColorHover `}>
            {/* <div className='absolute left-0 w-4 h-4/5 bg-primary rounded-full' /> */}
            {/* <i className={`text-primaryColor ${icon}`}></i> */}
            <span className='flex font-[400]'> {name} </span>
            <Switch onChange={onChange} active={active} />
        </button>
        <Modal setOpenModal={setModal} $isOpen={modal}>
            <Modal.Header>
                Add Barbershop
            </Modal.Header>
            <Modal.Body>
                {/* <button onClick={() => setActive(true)}>ok</button> */}
                <div className="felx flex-grow">
                    <form className="flex flex-grow flex-col">
                        <ul className="flex flex-col gap-3">
                            <li className='flex w-full gap-4 flex-wrap'>
                                <SettingInput label='Barbershop Name' className={'flex-auto max-w-[400px]'}>
                                    <input ref={nameRef} className='p-3 border border-gray-200 rounded-md' type="text" name="name"/>
                                </SettingInput>
                                <SettingInput label='Phone Number' className={'flex-auto max-w-[400px]'}>
                                    <input ref={phoneRef} className='p-3 border border-gray-200 rounded-md' type="text" name="phone"/>
                                </SettingInput>
                            </li>
                            <li className='flex w-full gap-4 flex-wrap'>
                                <SettingInput label='State' className={'flex-auto max-w-[400px]'}>
                                    <select className="w-full flex p-3 rounded border" ref={stateRef} name="states">
                                        {malayStates.map((state) => (
                                            <option className="" value={state}> 
                                                {state} 
                                            </option>
                                        ))}
                                    </select>
                                </SettingInput>
                                <SettingInput label='City' className={'flex-auto max-w-[400px]'}>
                                    <input ref={cityRef} className='p-3 border border-gray-200 rounded-md' type="text" name="city"/>
                                </SettingInput>
                            </li>
                            <li className='flex w-full gap-2 flex-wrap mt-3 bg-gray-100 py-4 rounded'>
                                <div className="flex gap-2 items-center">
                                <span className="text-gray-500"> Latitude & Longitude </span>
                                    <i class="fa fa-question-circle location-modal" aria-hidden="true"></i>
                                </div>
                                <div className="flex w-full gap-4">
                                <SettingInput label='Latitude' className={'flex-auto max-w-[400px]'}>
                                    <input ref={latitudeRef} className='p-3 border border-gray-200 rounded-md' type="text" name="city"/>
                                </SettingInput>
                                <SettingInput label='Longitude' className={'flex-auto max-w-[400px]'}>
                                    <input ref={longitudeRef} className='p-3 border border-gray-200 rounded-md' type="text" name="city"/>
                                </SettingInput>
                                </div>
                            </li>
                        </ul>
                    </form>
                </div>
                
            </Modal.Body>
        </Modal>
        </>
    )
}
