import React from 'react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { axiosInstance } from '../axiosCalls/axios';
import { useAuth } from '../context/AuthContext';

const Login = () => {
    const navigate = useNavigate();
    const { setCustomer } = useAuth();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })
    const [error, setError] = useState('');
    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev, [e.target.name]: e.target.value
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axiosInstance.post('/customers/login', formData);
            console.log('Customer Logged In')
            
            const me = await axiosInstance.get('/customers/me');
            setCustomer(me.data.customerData);
            
            setFormData({
                email: '',
                password: ''
            })
            setError('');
            navigate('/home');
        }
        catch (err) {
            setError(err.response?.data?.message)
        }
    }

    return (
        <div className="min-h-screen flex bg-neo-bg text-neo-ink font-sans selection:bg-neo-accent selection:text-white">

            {/* LEFT PANEL — Brand Showcase */}
            <div className="hidden lg:flex lg:w-[55%] relative overflow-hidden flex-col justify-between p-12 border-r-4 border-black bg-neo-secondary"
                style={{
                    backgroundImage: `linear-gradient(to right, rgba(0, 0, 0, 0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(0, 0, 0, 0.1) 1px, transparent 1px)`,
                    backgroundSize: '40px 40px'
                }}>

                {/* Top: Logo */}
                <div className="relative z-10">
                    <Link to="/" className="inline-block group cursor-pointer select-none font-sans">
                        <div className="absolute inset-0 bg-black translate-x-1.5 translate-y-1.5 transition-transform duration-100 group-active:translate-x-0 group-active:translate-y-0" />
                        <div className="relative border-4 border-black bg-white px-4 py-1.5 transition-transform duration-100 group-active:translate-x-1.5 group-active:translate-y-1.5">
                            <span className="font-black text-3xl tracking-tighter text-black uppercase leading-none">
                                NOISE.
                            </span>
                        </div>
                        <div className="absolute -top-3 -right-4 border-4 border-black bg-neo-accent px-1.5 py-0.5 rotate-[15deg] group-hover:rotate-[25deg] transition-transform duration-200 neo-shadow-sm">
                            <span className="block font-bold text-[10px] uppercase text-black tracking-widest leading-none">
                                Est. 99
                            </span>
                        </div>
                    </Link>
                </div>

                {/* Center: Hero message */}
                <div className="relative z-10 max-w-lg mt-12">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white border-4 border-black mb-8 -rotate-2 neo-shadow-sm">
                        <span className="w-3 h-3 rounded-full bg-neo-accent border-2 border-black animate-pulse" />
                        <span className="text-xs font-bold uppercase tracking-[0.1em] text-black">Secure Login</span>
                    </div>
                    <h1 className="text-6xl xl:text-7xl font-black tracking-tighter leading-[0.9] mb-6 uppercase text-white text-stroke-black drop-shadow-[4px_4px_0_rgba(0,0,0,1)]">
                        Welcome <br className="hidden xl:block" /> Back.
                    </h1>
                    <p className="text-black text-xl font-bold leading-snug max-w-sm border-l-4 border-black pl-4">
                        YOUR CURATED COLLECTION OF RAW STREETWEAR AWAITS. SIGN IN TO ACCESS YOUR STASH.
                    </p>
                </div>

                {/* Bottom: Floating elements to add chaos */}
                <div className="relative z-10 mt-auto flex items-center gap-6">
                    <div className="w-16 h-16 bg-neo-muted border-4 border-black neo-shadow-md rounded-full flex items-center justify-center rotate-12">
                        <svg className="w-8 h-8 stroke-[3px]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                    </div>
                    <div className="border-4 border-black bg-white px-4 py-2 neo-shadow-sm -rotate-3">
                        <span className="font-bold uppercase tracking-wider text-sm">ENCRYPTED & RAW</span>
                    </div>
                </div>
            </div>

            {/* RIGHT PANEL — Login Form */}
            <div className="w-full lg:w-[45%] flex items-center justify-center relative bg-neo-bg">

                {/* Mobile logo */}
                <div className="absolute top-6 left-6 lg:hidden z-10">
                    <Link to="/" className="inline-block group cursor-pointer">
                        <div className="absolute inset-0 bg-black translate-x-1 translate-y-1" />
                        <div className="relative border-4 border-black bg-neo-secondary px-3 py-1">
                            <span className="font-black text-xl tracking-tighter text-black uppercase">NOISE.</span>
                        </div>
                    </Link>
                </div>

                <div className="relative z-10 w-full max-w-[420px] px-6 sm:px-8">
                    {/* Header */}
                    <div className="mb-10">
                        <h2 className="text-4xl sm:text-5xl font-black tracking-tighter text-black mb-2 uppercase">
                            Sign In
                        </h2>
                        <p className="text-black font-bold text-base border-b-4 border-black inline-block pb-1">
                            ENTER CREDENTIALS TO PROCEED
                        </p>
                    </div>

                    {/* Error Display */}
                    {error && (
                        <div className="mb-6 flex items-center gap-3 px-4 py-3 bg-neo-accent border-4 border-black text-black text-sm neo-shadow-sm rotate-1">
                            <svg className="w-6 h-6 shrink-0 stroke-[3px]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                            </svg>
                            <span className="font-bold uppercase tracking-wide">{error}</span>
                        </div>
                    )}

                    {/* Form */}
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        {/* Email */}
                        <div>
                            <label className="block text-sm font-bold text-black uppercase tracking-widest mb-2" htmlFor="email">
                                Email Address
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                onChange={handleChange}
                                value={formData.email}
                                placeholder="JOHNDOE@EXAMPLE.COM"
                                autoComplete="email"
                                className="w-full h-14 px-4 bg-white border-4 border-black rounded-none focus:outline-none focus:bg-neo-secondary focus:neo-shadow-sm transition-all text-lg font-bold text-black placeholder:text-black/30 placeholder:uppercase"
                            />
                        </div>

                        {/* Password */}
                        <div>
                            <label className="block text-sm font-bold text-black uppercase tracking-widest mb-2" htmlFor="password">
                                Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                onChange={handleChange}
                                value={formData.password}
                                placeholder="••••••••"
                                autoComplete="current-password"
                                className="w-full h-14 px-4 bg-white border-4 border-black rounded-none focus:outline-none focus:bg-neo-secondary focus:neo-shadow-sm transition-all text-lg font-bold text-black placeholder:text-black/30"
                            />
                        </div>

                        {/* Submit */}
                        <div className="pt-2">
                            <button
                                type="submit"
                                className="relative group w-full block cursor-pointer"
                            >
                                <div className="absolute inset-0 bg-black translate-x-2 translate-y-2 group-active:translate-x-0 group-active:translate-y-0 transition-transform duration-100" />
                                <div className="relative h-14 bg-neo-accent border-4 border-black flex items-center justify-center gap-2 group-active:translate-x-2 group-active:translate-y-2 transition-transform duration-100">
                                    <span className="font-black text-xl uppercase tracking-wider text-black">Login Now</span>
                                    <svg className="w-6 h-6 stroke-[3px]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                    </svg>
                                </div>
                            </button>
                        </div>
                    </form>

                    {/* Divider */}
                    <div className="mt-10 border-t-4 border-black pt-6">
                        <div className="flex flex-col gap-2">
                            <p className="text-black font-bold uppercase text-sm">
                                NO ACCOUNT YET?
                            </p>
                            <Link to="/signup" className="inline-block w-fit bg-neo-muted border-4 border-black px-4 py-2 font-black uppercase text-black hover:bg-neo-secondary hover:-translate-y-1 hover:neo-shadow-sm transition-all duration-200">
                                Create Stash
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
