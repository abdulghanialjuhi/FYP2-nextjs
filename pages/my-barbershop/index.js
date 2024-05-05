import React from 'react'
import { ProtectedRoute } from '../../components/common/ProtectRoutes'
import MyBarbershop from '../../components/pages/my-barbershop'

export default function index() {

    return (
        <ProtectedRoute>
            <MyBarbershop />
        </ProtectedRoute>
    )
}
