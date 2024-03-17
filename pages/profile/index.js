import React from 'react'
import Profile from '../../components/pages/profile'
import { ProtectedRoute } from '../../components/common/ProtectRoutes'

export default function index() {

    return (
        <ProtectedRoute>
            <Profile />
        </ProtectedRoute>
    )
}
