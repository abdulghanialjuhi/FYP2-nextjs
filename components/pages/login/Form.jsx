// import { Context } from "@/app/GlobalState";
import axios from "axios";
import Link from "next/link";
import { useContext, useRef, useState } from "react";
import { useRouter } from "next/navigation";
// import { BtnLoadingIndicator } from "../common/LoadingIndicator";
import { Context } from "../../../context/GlobalState";
import { BtnLoadingIndicator } from "../../common/LoadingIndicator";

const Form = () => {
    const [btnLoading, setBtnLoading] = useState(false)
    const emailRef = useRef()
    const passwordRef = useRef()
    const { actions, addNewNotifcation } = useContext(Context)

    const router = useRouter()

    const handleLogin = (e) => {
        e.preventDefault()
        if (btnLoading) return


        const userObj = {
            email: emailRef.current.value,
            password: passwordRef.current.value,
        }

        setBtnLoading(true)
        axios.post('/api/auth/login', userObj)
        .then(async (res) => {
            if (res.data?.user?.profilePic) {
                // const results = await fetchImageById(res.data.user.profilePic)
                // res.data.user['profileImg'] = results.blob
            }
            actions({type: 'SET_USER', payload: res.data.user})
            actions({type: 'SET_IS_AUTH', payload: res.data.auth})
            // router.push('create-listing')
            console.log('res:', res.data);
        }).catch((error) => {
            console.log('error: ', error);
            addNewNotifcation('Email or Password Not Correct', 'danger')
        }).finally(() => {
            setBtnLoading(false)
        })
        
    }

    return (
        <form className="w-full flex flex-col gap-5" onSubmit={handleLogin}>
            <div className="flex flex-col">
                <h3 className="text-2xl font-[500] mb-2 text-[#484848] text-center">Login to your account</h3>
                <p className="text-sm text-[#484848] font-[400] text-center">
                Dont have an account?{" "}
                <Link href="/signup" className="text-primaryColor">
                    Sign Up!
                </Link>
                </p>
            </div>
            {/* End .heading */}

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
                    <i aria-hidden className="fa fa-envelope-o text-primaryColor"></i>
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
            <button disabled={btnLoading} onSubmit={handleLogin} type="submit" className="primary-button">
                {btnLoading ? <BtnLoadingIndicator /> : 'Log In'}
            </button>
            {/* login button */}
        </form>
    );
};

export default Form;
