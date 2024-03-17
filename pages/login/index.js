import React from 'react'
import Login from '../../components/pages/login'
import { RedirectRoutes } from '../../components/common/RedirectRoutes'


export default function index() {

    return (
        <RedirectRoutes>
            <Login />
        </RedirectRoutes>
    )
}
