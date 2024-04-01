import axios from "axios";
import Link from "next/link";
import { useContext, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Context } from "../../../context/GlobalState";
import { BtnLoadingIndicator } from "../../common/LoadingIndicator";

const Form = ({ setUserObj, setShowOwnerForm }) => {
    const [btnLoading, setBtnLoading] = useState(false)
    const [isOwner, setIsOwner] = useState(false)

    
    const emailRef = useRef()
    const phoneRef = useRef()
    const nameRef = useRef()
    const passwordRef = useRef()
    const confirmPasswordRef = useRef()

    const { actions, addNewNotifcation } = useContext(Context)

    const router = useRouter()

    const handleSignup = (e) => {
        e.preventDefault()
        if (btnLoading) return

        if (passwordRef.current.value.length < 8) {
            return addNewNotifcation('Password must be at least 8 character', 'warning')
        } else if (passwordRef.current.value !== confirmPasswordRef.current.value) {
            return addNewNotifcation('Password and Confirm Password Does Not Match', 'warning')
        }
        
        setBtnLoading(true)

        const userObj = {
            fullName: nameRef.current.value,
            email: emailRef.current.value,
            phoneNumber: phoneRef.current.value,
            password: passwordRef.current.value,
        }

        if (isOwner) {
            setUserObj(userObj)
            return setShowOwnerForm(true)
        }

        axios.post('/api/auth/signup', userObj)
        .then(async (res) => {
            if (res.data?.user?.profilePic) {
                // const results = await fetchImageById(res.data.user.profilePic)
                // res.data.user['profileImg'] = results.blob
            }
            addNewNotifcation('Account created successfully', 'success')
            actions({type: 'SET_USER', payload: res.data.user})
            actions({type: 'SET_IS_AUTH', payload: true})
            console.log('res:', res.data);
        }).catch((error) => {
            console.log('error: ', error);
            if (error?.response?.status === 409) {
                addNewNotifcation('Email already used', 'danger')
            } else {
                addNewNotifcation('Something went wrong', 'danger')
            }
        }).finally(() => {
            setBtnLoading(false)
        })
        
    }

    return (
        <form className="w-full flex flex-col gap-5" onSubmit={handleSignup}>
            <div className="flex flex-col">
                <h3 className="text-2xl font-[500] mb-2 text-[#484848] text-center">
                    Register to your account
                </h3>
                <p className="text-sm text-[#484848] font-[400] text-center">
                    Already have an account?{" "}
                    <Link href="/login" className="text-primaryColor">
                        Login
                    </Link>
                </p>
            </div>
            {/* End .heading */}

            <div className="mb-2 relative">
                <input
                ref={nameRef}
                name="name"
                type="text"
                className="input-control"
                required
                placeholder="Name"
                />

                <div className="absolute top-0 right-0 h-full flex items-center pr-5">
                <div className="">
                    <i aria-hidden className="fa fa-user  text-primaryColor"></i>
                </div>
                </div>
            </div>
            {/* End .input-group */}
            <div className="mb-2 relative">
                <input
                ref={emailRef}
                name="email"
                type="email"
                className="input-control"
                required
                placeholder="Email"
                />

                <div className="absolute top-0 right-0 h-full flex items-center pr-5">
                <div className="">
                    {/* <i aria-hidden className="fa-envelope text-primaryColor"></i> */}
                    <i className="fa fa-envelope text-primaryColor" aria-hidden="true"></i>
                </div>
                </div>
            </div>
            {/* End .input-group */}
            <div className="mb-2 relative">
                <input
                ref={phoneRef}
                name="text"
                type="phone"
                className="input-control"
                required
                placeholder="Phone"
                />

                <div className="absolute top-0 right-0 h-full flex items-center pr-5">
                <div className="">
                    <i aria-hidden className="fa fa-phone text-primaryColor"></i>
                </div>
                </div>
            </div>
            {/* End .input-group */}

            <div className="mb-2 relative">
                <input
                ref={passwordRef}
                name="password"
                type="password"
                className="input-control"
                required
                placeholder="Password"
                />

                <div className="absolute top-0 right-0 h-full flex items-center pr-5">
                <div className="">
                    <i aria-hidden className="fa fa-unlock-alt text-primaryColor"></i>
                </div>
                </div>
            </div>

            <div className="mb-2 relative">
                <input
                ref={confirmPasswordRef}
                name="confirm password"
                type="password"
                className="input-control"
                required
                placeholder="Confirm Password"
                />

                <div className="absolute top-0 right-0 h-full flex items-center pr-5">
                <div className="">
                    <i aria-hidden className="fa fa-unlock-alt text-primaryColor"></i>
                </div>
                </div>
            </div>

            <div className="mb-2 relative flex gap-2">
                <input
                id='bussniess-owner'
                name="bussniess owner"
                type="checkbox"
                className="cursor-pointer"
                value={isOwner}
                onChange={e => setIsOwner(!isOwner)}
                // placeholder="Confirm Password"
                />
                <label className='cursor-pointer' htmlFor="bussniess-owner">I am business owner</label>
            </div>


            <button disabled={btnLoading} onSubmit={handleSignup} type="submit" className="primary-button">
                {btnLoading ? <BtnLoadingIndicator /> : isOwner ? "Next" : 'Register'}
            </button>
            {/* login button */}
        </form>
    );
};

export default Form;
