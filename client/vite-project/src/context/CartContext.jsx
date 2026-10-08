import React, { createContext, useContext, useState, useEffect } from 'react';
import { axiosInstance } from '../axiosCalls/axios';
import { useAuth } from './AuthContext';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
    const { customer } = useAuth();

    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    // FETCH CART
    const fetchCart = async () => {
        setLoading(true);
        try {
            const response = await axiosInstance.get('/cart');
            setCartItems(response.data.cart);
        } catch (err) {
            console.error("Error fetching cart:", err);
            setError("Failed to load cart. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    // Fetch the cart whenever the logged-in customer changes
    useEffect(() => {
        if (customer) {
            fetchCart();
        } else {
            setCartItems([]); // Clear cart if logged out
        }
    }, [customer]);

    // ADD TO CART
    const addToCart = async (productId) => {
        setError('');
        try {
            const response = await axiosInstance.post(`/cart/${productId}`);
            setCartItems(response.data.cart);
            console.log(response);
            return { success: true, data: response.data.cart };
        } catch (err) {
            console.error("Error adding to cart:", err);
            const errMsg = err.response?.data?.message || "Failed to add to cart";
            setError(errMsg);
            return { success: false, message: errMsg }
        }
    };

    // UPDATE QUANTITY
    const updateQuantity = async (productId, quantity) => {
        setError('');
        try {
            const response = await axiosInstance.patch(`/cart/${productId}`, { quantity });
            setCartItems(response.data.cart);
            console.log(response);
            return { success: true, data: response.data.cart };
        } catch (err) {
            console.error("Error updating quantity:", err);
            const errMsg = err.response?.data?.message || "Failed to update quantity";
            setError(errMsg);
            return { success: false, message: errMsg }
        }
    };

    // REMOVE FROM CART
    const removeFromCart = async (productId) => {
        setError('');
        try {
            const response = await axiosInstance.delete(`/cart/${productId}`);
            setCartItems(response.data.cart);
            console.log(response);
            return { success: true, data: response.data.cart };
        } catch (err) {
            console.error("Error removing from cart:", err);
            const errMsg = err.response?.data?.message || "Failed to remove item";
            setError(errMsg);
            return { success: false, message: errMsg }
        }
    };

    return (
        <CartContext.Provider
            value={{
                cartItems,
                loading,
                error,
                fetchCart,
                addToCart,
                updateQuantity,
                removeFromCart
            }}
        >
            {children}
        </CartContext.Provider>
    );
};
