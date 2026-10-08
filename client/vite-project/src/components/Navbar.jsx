import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { axiosInstance } from '../axiosCalls/axios';

const Navbar = () => {
    const navigate = useNavigate();
    const { customer, setCustomer } = useAuth();
    const { cartItems } = useCart();

    const handleLogout = async () => {
        try {
            await axiosInstance.post('/customers/logout');
            setCustomer(null);
            navigate('/login');
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <header className="sticky top-0 z-50 bg-neo-bg border-b-4 border-black">
            <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                {/* Brand Logo */}
                <div className="flex items-center gap-3 cursor-pointer group" onClick={() => navigate('/home')}>
                    <div className="relative inline-block select-none font-sans">
                        <div className="absolute inset-0 bg-black translate-x-1 translate-y-1 group-active:translate-x-0 group-active:translate-y-0 transition-transform duration-100" />
                        <div className="relative border-4 border-black bg-neo-secondary px-3 py-1 transition-transform duration-100 group-active:translate-x-1 group-active:translate-y-1">
                            <span className="font-black text-2xl tracking-tighter text-black uppercase leading-none">
                                NOISE.
                            </span>
                        </div>
                    </div>
                </div>

                {/* Navigation */}
                <nav className="hidden md:flex items-center gap-8 text-sm font-bold tracking-widest uppercase">
                    <span onClick={() => navigate('/products')} className="hover:text-neo-accent hover:-translate-y-0.5 transition-transform cursor-pointer flex items-center gap-2">
                        New Drops
                        <span className="w-2 h-2 border-2 border-black rounded-full bg-neo-accent animate-pulse"></span>
                    </span>
                    <span className="hover:text-neo-accent hover:-translate-y-0.5 transition-transform cursor-pointer">Trending</span>
                    <span onClick={() => navigate('/wishlist')} className="hover:text-neo-accent hover:-translate-y-0.5 transition-transform cursor-pointer flex items-center gap-2">
                        Wishlist 
                        {customer?.wishlist?.length > 0 && (
                            <span className="bg-[#FF4545] text-white px-2 py-0.5 border-2 border-black text-xs font-black">
                                {customer.wishlist.length}
                            </span>
                        )}
                    </span>
                    <span className="hover:text-neo-accent hover:-translate-y-0.5 transition-transform cursor-pointer">About</span>
                </nav>

                {/* Actions */}
                <div className="flex items-center gap-4">
                    {/* Search */}
                    <button type="button" className="hidden sm:flex w-10 h-10 items-center justify-center border-4 border-black bg-white neo-shadow-sm hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none transition-all">
                        <svg className="w-5 h-5 stroke-[3px]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                        </svg>
                    </button>

                    {/* Cart */}
                    <button 
                        type="button" 
                        onClick={() => navigate('/cart')}
                        className="relative w-10 h-10 flex items-center justify-center border-4 border-black bg-neo-muted neo-shadow-sm hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none transition-all cursor-pointer"
                    >
                        <svg className="w-5 h-5 stroke-[3px]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007z" />
                        </svg>
                        {cartItems?.length > 0 && (
                            <span className="absolute -top-3 -right-3 w-6 h-6 bg-neo-accent border-2 border-black flex items-center justify-center text-xs font-black rotate-6">
                                {cartItems.length}
                            </span>
                        )}
                    </button>

                    {/* Logout Button */}
                    <button
                        type="button"
                        onClick={handleLogout}
                        className="relative group px-4 py-2 font-bold uppercase tracking-wider text-sm flex items-center gap-2 cursor-pointer"
                    >
                        <div className="absolute inset-0 bg-black translate-x-1.5 translate-y-1.5 group-active:translate-x-0 group-active:translate-y-0 transition-transform duration-100" />
                        <div className="relative border-4 border-black bg-[#FF4545] text-black px-4 py-2 transition-transform duration-100 group-active:translate-x-1.5 group-active:translate-y-1.5 flex items-center gap-2">
                            <svg className="w-4 h-4 stroke-[3px]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
                            </svg>
                            <span className="hidden sm:inline">Logout</span>
                        </div>
                    </button>
                </div>
            </div>
        </header>
    );
};

export default Navbar;
