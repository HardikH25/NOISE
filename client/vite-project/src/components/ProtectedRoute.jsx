import React from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({children}) => {
    const { customer, loading } = useAuth();
    
    if (loading) {
        return (
            <div className="min-h-screen bg-neo-bg flex items-center justify-center">
                <div className="text-4xl font-black uppercase flex items-center gap-4">
                    <span className="w-8 h-8 border-4 border-black border-t-neo-accent rounded-full animate-spin"></span>
                    Loading...
                </div>
            </div>
        );
    }

    if(!customer){
        return <Navigate to='/login'/>
    }
    
    return children;
}
export default ProtectedRoute;
