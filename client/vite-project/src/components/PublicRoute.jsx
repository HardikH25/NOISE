import React from 'react'
import { useAuth } from '../context/AuthContext.jsx'
import { Navigate } from 'react-router-dom'

function PublicRoute({ children }) {
    const { customer } = useAuth()
    if (customer) {
        return <Navigate to = '/home'></Navigate>
    }
    return children
}
export default PublicRoute