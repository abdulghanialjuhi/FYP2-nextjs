import React from 'react'
import Signup from '../components/pages/signup/index'
import { RedirectRoutes } from '../components/common/RedirectRoutes'

export default function singup() {
    
    return (
        <RedirectRoutes>
            <Signup />
        </RedirectRoutes>
    )
}
