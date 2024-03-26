import React from 'react'
import { ProtectedRoute } from '../../components/common/ProtectRoutes'
import BusinessAccount from '../../components/pages/businessAccount'

export default function index() {

    return (
        <ProtectedRoute>
            <BusinessAccount />
        </ProtectedRoute>
    )
}
