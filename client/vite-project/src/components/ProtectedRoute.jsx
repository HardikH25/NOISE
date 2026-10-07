import React from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({children}) => {
    const {customer} = useAuth();
    if(!customer){
        return <Navigate to = '/login'/>
    }
    return (
       children
    );
}
export default ProtectedRoute;
