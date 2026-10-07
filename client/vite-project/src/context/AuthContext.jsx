import { useEffect, useState, useContext, createContext } from "react";
import { axiosInstance } from "../axiosCalls/axios";

const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
    const [customer, setCustomer] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axiosInstance.get('/customers/me').then((res) => {
            setCustomer(res.data.customerData)
        }).catch((err) => {
            console.log(err);
        }).finally(() => {
            setLoading(false);
        });
    }, [])

    return (
        <AuthContext.Provider value={{ customer, setCustomer, loading }}>
            {children}
        </AuthContext.Provider>
    )
}
export const useAuth = ()=> useContext(AuthContext);
