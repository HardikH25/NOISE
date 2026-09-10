import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { axiosInstance } from '../axiosCalls/axios';

const Signup = () => {

    const [formData, setFormData] = useState({
        fullname: '',
        email: '',
        phone: '',
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
            await axiosInstance.post('/customers/register', formData);
            console.log('Customer Registered')
            setFormData({
                fullname: '',
                email: '',
                phone: '',
                password: ''
            })
        }
        catch (err) {
            setError(err.response?.data?.message)
        }
    }

    return (
        <div className="min-h-screen flex bg-neo-bg text-neo-ink font-sans selection:bg-neo-accent selection:text-white">

            {/* ═══════════════════════════════════════════ */}
            {/* LEFT PANEL — Brand Showcase */}
            {/* ═══════════════════════════════════════════ */}
            <div className="hidden lg:flex lg:w-[55%] relative overflow-hidden flex-col justify-between p-12 border-r-4 border-black bg-neo-muted"
                style={{
                    backgroundImage: `radial-gradient(circle, #000 1.5px, transparent 1.5px)`,
                    backgroundSize: '20px 20px'
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
                    </Link>
                </div>

                {/* Center: Hero message */}
                <div className="relative z-10 max-w-lg mt-12 bg-white border-4 border-black p-8 neo-shadow-lg rotate-1 hover:rotate-0 transition-transform duration-300">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-neo-accent border-4 border-black mb-6 rotate-2 shadow-[4px_4px_0_0_#000]">
                        <span className="w-2 h-2 rounded-full bg-white border border-black animate-pulse" />
                        <span className="text-[10px] font-black uppercase tracking-widest text-black">Join The Kult</span>
                    </div>
                    <h1 className="text-5xl xl:text-6xl font-black tracking-tighter leading-[0.95] mb-4 uppercase text-black">
                        START YOUR<br />JOURNEY.
                    </h1>
                    <p className="text-black text-lg font-bold leading-snug">
                        NO FILLER. NO CORPORATE BS. CREATE YOUR ACCOUNT TO UNLOCK RAW FASHION AND EXCLUSIVE DROPS.
                    </p>

                    {/* Feature pills */}
                    <div className="flex flex-wrap gap-3 mt-8">
                        <div className="flex items-center gap-2 px-3 py-1.5 bg-neo-secondary border-4 border-black text-xs text-black font-black uppercase shadow-[2px_2px_0_0_#000] hover:-translate-y-1 hover:shadow-[4px_4px_0_0_#000] transition-all">
                            <svg className="w-4 h-4 stroke-[3px]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                            TRUSTED SELLERS
                        </div>
                        <div className="flex items-center gap-2 px-3 py-1.5 bg-[#FFFDF5] border-4 border-black text-xs text-black font-black uppercase shadow-[2px_2px_0_0_#000] hover:-translate-y-1 hover:shadow-[4px_4px_0_0_#000] transition-all -rotate-1">
                            <svg className="w-4 h-4 stroke-[3px]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                            MULTIPLE CATEGORIES
                        </div>
                        <div className="flex items-center gap-2 px-3 py-1.5 bg-neo-accent border-4 border-black text-xs text-black font-black uppercase shadow-[2px_2px_0_0_#000] hover:-translate-y-1 hover:shadow-[4px_4px_0_0_#000] transition-all rotate-1">
                            <svg className="w-4 h-4 stroke-[3px]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                            QUALITY ASSURED
                        </div>
                    </div>
                </div>

                {/* Bottom: Trust signals */}
                <div className="relative z-10 mt-auto flex items-center gap-6 pt-12">
                    <div className="border-4 border-black bg-white px-3 py-1 neo-shadow-sm rotate-2">
                        <span className="font-bold uppercase tracking-wider text-sm text-black">NO SPAM. JUST NOISE.</span>
                    </div>
                </div>
            </div>

            {/* ═══════════════════════════════════════════ */}
            {/* RIGHT PANEL — Signup Form */}
            {/* ═══════════════════════════════════════════ */}
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

                <div className="relative z-10 w-full max-w-[420px] px-6 sm:px-8 py-12">
                    {/* Header */}
                    <div className="mb-8">
                        <h2 className="text-4xl sm:text-5xl font-black tracking-tighter text-black mb-2 uppercase">
                            Create Account
                        </h2>
                        <p className="text-black font-bold text-base border-b-4 border-black inline-block pb-1">
                            FILL YOUR DETAILS TO START
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
                    <form className="space-y-5" onSubmit={handleSubmit}>
                        {/* Full Name */}
                        <div>
                            <label className="block text-sm font-bold text-black uppercase tracking-widest mb-1.5" htmlFor="fullName">
                                Full Name
                            </label>
                            <input
                                type="text"
                                id="fullName"
                                name="fullname"
                                onChange={handleChange}
                                value={formData.fullname}
                                placeholder="JOHN DOE"
                                autoComplete="name"
                                className="w-full h-12 px-4 bg-white border-4 border-black rounded-none focus:outline-none focus:bg-neo-secondary focus:neo-shadow-sm transition-all text-base font-bold text-black placeholder:text-black/30 placeholder:uppercase"
                            />
                        </div>

                        {/* Email */}
                        <div>
                            <label className="block text-sm font-bold text-black uppercase tracking-widest mb-1.5" htmlFor="email">
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                onChange={handleChange}
                                value={formData.email}
                                placeholder="JOHNDOE@EXAMPLE.COM"
                                autoComplete="email"
                                className="w-full h-12 px-4 bg-white border-4 border-black rounded-none focus:outline-none focus:bg-neo-secondary focus:neo-shadow-sm transition-all text-base font-bold text-black placeholder:text-black/30 placeholder:uppercase"
                            />
                        </div>

                        {/* Phone */}
                        <div>
                            <label className="block text-sm font-bold text-black uppercase tracking-widest mb-1.5" htmlFor="phone">
                                Phone
                            </label>
                            <input
                                type="tel"
                                id="phone"
                                name="phone"
                                onChange={handleChange}
                                value={formData.phone}
                                placeholder="+1 (555) 000-0000"
                                autoComplete="tel"
                                className="w-full h-12 px-4 bg-white border-4 border-black rounded-none focus:outline-none focus:bg-neo-secondary focus:neo-shadow-sm transition-all text-base font-bold text-black placeholder:text-black/30 placeholder:uppercase"
                            />
                        </div>

                        {/* Password */}
                        <div>
                            <label className="block text-sm font-bold text-black uppercase tracking-widest mb-1.5" htmlFor="password">
                                Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                onChange={handleChange}
                                value={formData.password}
                                placeholder="••••••••"
                                autoComplete="new-password"
                                className="w-full h-12 px-4 bg-white border-4 border-black rounded-none focus:outline-none focus:bg-neo-secondary focus:neo-shadow-sm transition-all text-base font-bold text-black placeholder:text-black/30"
                            />
                            <p className="text-xs font-bold text-black mt-2 bg-neo-muted border-2 border-black inline-block px-2 py-0.5 rotate-1">MINIMUM 6 CHARS</p>
                        </div>

                        {/* Submit */}
                        <div className="pt-4">
                            <button
                                type="submit"
                                className="relative group w-full block cursor-pointer"
                            >
                                <div className="absolute inset-0 bg-black translate-x-2 translate-y-2 group-active:translate-x-0 group-active:translate-y-0 transition-transform duration-100" />
                                <div className="relative h-14 bg-neo-secondary border-4 border-black flex items-center justify-center gap-2 group-active:translate-x-2 group-active:translate-y-2 transition-transform duration-100">
                                    <span className="font-black text-xl uppercase tracking-wider text-black">Create Account</span>
                                    <svg className="w-6 h-6 stroke-[3px]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                    </svg>
                                </div>
                            </button>
                        </div>
                    </form>

                    {/* Login link */}
                    <div className="mt-8 border-t-4 border-black pt-6">
                        <div className="flex flex-col gap-2">
                            <p className="text-black font-bold uppercase text-sm">
                                ALREADY HAVE AN ACCOUNT?
                            </p>
                            <Link to="/login" className="inline-block w-fit bg-white border-4 border-black px-4 py-2 font-black uppercase text-black hover:bg-neo-accent hover:-translate-y-1 hover:neo-shadow-sm transition-all duration-200">
                                Sign In
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Signup;
