import React from 'react'
import MyBooking from '../../components/pages/myBooking'
import { ProtectedRoute } from '../../components/common/ProtectRoutes'

export default function index() {

    return (
        <ProtectedRoute>
            <MyBooking />
        </ProtectedRoute>
    )
}
