import { useEffect, useState, useContext, createContext } from "react";
import { axiosInstance } from "../axiosCalls/axios";

const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
    const [customer, setCustomer] = useState(null);
    useEffect(() => {
        axiosInstance.get('/customers/me').then((res) => {
            setCustomer(res.data.customerData)
        }).catch((err) => {
            console.log(err);
        })
    }, [])
    return (
        <AuthContext.Provider value={{ customer, setCustomer }}>
            {children}
        </AuthContext.Provider>
    )
}
export const useAuth = ()=> useContext(AuthContext);
