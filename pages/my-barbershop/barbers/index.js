import React from 'react'
import { ProtectedRoute } from '../../../components/common/ProtectRoutes'
import Barbers from '../../../components/pages/my-barbershop/barbers'

export default function index() {

    return (
        <ProtectedRoute>
            <Barbers />
        </ProtectedRoute>
    )
}
