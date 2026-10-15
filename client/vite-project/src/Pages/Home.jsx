import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { axiosInstance } from '../axiosCalls/axios';
import { useAuth } from '../context/AuthContext';
import Footer from '../components/Footer';

const Home = () => {
    const navigate = useNavigate();
    const { customer, setCustomer } = useAuth();

    // Category live product counts
    const [categoryCounts, setCategoryCounts] = useState({
        'Hoodies': 0,
        'Sneakers': 0,
        'Graphic Tees': 0,
        'Cargos': 0
    });

    // Newsletter subscription state
    const [newsletterEmail, setNewsletterEmail] = useState('');
    const [subscribeStatus, setSubscribeStatus] = useState('idle'); // idle | loading | success | error
    const [subscribeMsg, setSubscribeMsg] = useState('');

    useEffect(() => {
        const fetchCategoryCounts = async () => {
            try {
                const res = await axiosInstance.get('/products');
                if (res.data?.products) {
                    const counts = { 'Hoodies': 0, 'Sneakers': 0, 'Graphic Tees': 0, 'Cargos': 0 };
                    res.data.products.forEach(p => {
                        if (counts[p.category] !== undefined) {
                            counts[p.category]++;
                        } else {
                            counts[p.category] = 1;
                        }
                    });
                    setCategoryCounts(counts);
                }
            } catch (err) {
                console.error('Error fetching categories count:', err);
            }
        };
        fetchCategoryCounts();
    }, []);

    const handleSubscribe = async (e) => {
        if (e) e.preventDefault();
        if (!newsletterEmail || !newsletterEmail.trim()) {
            setSubscribeStatus('error');
            setSubscribeMsg('Please enter your email address.');
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(newsletterEmail.trim())) {
            setSubscribeStatus('error');
            setSubscribeMsg('Please enter a valid email address.');
            return;
        }

        try {
            setSubscribeStatus('loading');
            setSubscribeMsg('');
            const res = await axiosInstance.post('/newsletter/subscribe', {
                email: newsletterEmail.trim()
            });

            if (res.data.success) {
                setSubscribeStatus('success');
                setSubscribeMsg(res.data.message || "YOU'RE IN! WELCOME TO THE KULT.");
                setNewsletterEmail('');
            }
        } catch (err) {
            setSubscribeStatus('error');
            setSubscribeMsg(err.response?.data?.message || 'Failed to join the Kult. Try again.');
        }
    };

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
        <div className="min-h-screen bg-neo-bg text-neo-ink font-sans selection:bg-neo-accent selection:text-white relative overflow-hidden">

            {/* Subtle Dot Grid Background */}
            <div
                className="fixed inset-0 pointer-events-none -z-10"
                style={{
                    backgroundImage: `radial-gradient(circle, #000 1.5px, transparent 1.5px)`,
                    backgroundSize: '24px 24px',
                    opacity: 0.1
                }}
            />

            {/* HERO SECTION - EDITORIAL STREETWEAR COLLAGE */}
            <section className="relative min-h-[90vh] border-b-4 border-black overflow-hidden flex flex-col md:flex-row bg-neo-bg md:bg-black">

                {/* Left Content Column */}
                <div className="relative z-20 flex-1 flex flex-col justify-center px-6 md:px-12 py-16 md:py-0 border-b-4 md:border-b-0 border-black md:border-transparent pointer-events-none">

                    {/* The Slanted Background Layer */}
                    <div className="hidden md:block absolute inset-y-0 -left-[50vw] -right-[8vw] bg-neo-bg -skew-x-[12deg] origin-top z-[-1] border-r-0 pointer-events-auto">
                        {/* Torn Paper Edge (Desktop Only) */}
                        <svg
                            className="absolute top-0 -right-[18px] h-full w-5 z-30"
                            preserveAspectRatio="none"
                            viewBox="0 0 20 100"
                        >
                            <polygon
                                points="0,0 0,100 20,100 12,98 18,95 10,91 16,88 8,84 18,79 12,75 20,70 10,66 16,62 8,58 20,53 12,49 18,45 10,41 16,37 8,33 20,28 12,24 18,20 10,16 16,12 8,8 20,4 12,2 20,0"
                                fill="#FFFDF5"
                            />
                            <polyline
                                points="20,100 12,98 18,95 10,91 16,88 8,84 18,79 12,75 20,70 10,66 16,62 8,58 20,53 12,49 18,45 10,41 16,37 8,33 20,28 12,24 18,20 10,16 16,12 8,8 20,4 12,2 20,0"
                                fill="none"
                                stroke="black"
                                strokeWidth="4"
                                vectorEffect="non-scaling-stroke"
                            />
                        </svg>
                    </div>

                    {/* Inner Content Container */}
                    <div className="pointer-events-auto">
                        {/* Badge */}
                        <div className="inline-flex items-center gap-2 px-4 py-2 border-4 border-black bg-neo-accent neo-shadow-sm mb-8 -rotate-2 self-start hover:rotate-0 transition-transform">
                            <span className="w-3 h-3 rounded-full bg-white border-2 border-black animate-pulse"></span>
                            <span className="text-xs font-black uppercase tracking-widest text-black">New Season Drop</span>
                        </div>

                        {/* Headline */}
                        <h1 className="text-6xl sm:text-7xl lg:text-[8rem] font-black tracking-tighter leading-[0.8] mb-6 uppercase relative">
                            WEAR<br />
                            THE<br />
                            <span className="text-transparent text-stroke-black relative inline-block drop-shadow-[4px_4px_0_rgba(255,217,61,1)]">
                                FUTURE.
                                {/* Decorative Star */}
                                <svg className="absolute -top-4 -right-12 w-12 h-12 md:w-16 md:h-16 fill-neo-secondary stroke-black stroke-[3px] animate-[spin_10s_linear_infinite] -z-10" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                                </svg>
                            </span>
                        </h1>

                        <p className="text-black font-bold text-lg md:text-xl max-w-md uppercase border-l-4 border-black pl-4 mb-10 bg-white/50 py-2">
                            Curated streetwear for those who refuse to blend in. No corporate aesthetics. Just raw, unfiltered drops.
                        </p>

                        {/* CTA Row */}
                        <div className="flex flex-col sm:flex-row items-start gap-4">
                            {/* Primary Button */}
                            <button onClick={() => navigate('/products')} type="button" className="relative group w-full sm:w-auto cursor-pointer block">
                                <div className="absolute inset-0 bg-black translate-x-2 translate-y-2 group-hover:translate-x-3 group-hover:translate-y-3 transition-transform duration-200" />
                                <div className="relative border-4 border-black bg-neo-secondary px-8 py-4 flex items-center justify-center gap-3 transition-transform duration-200 active:translate-x-2 active:translate-y-2">
                                    <span className="font-black text-xl uppercase tracking-wider text-black">Shop Drops</span>
                                    <svg className="w-6 h-6 stroke-[3px] text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                    </svg>
                                </div>
                            </button>

                            {/* Secondary Button */}
                            <button onClick={() => navigate('/products')} type="button" className="relative group w-full sm:w-auto cursor-pointer block mt-2 sm:mt-0">
                                <div className="absolute inset-0 bg-black translate-x-2 translate-y-2 group-hover:translate-x-3 group-hover:translate-y-3 transition-transform duration-200" />
                                <div className="relative border-4 border-black bg-white px-8 py-4 flex items-center justify-center gap-3 transition-transform duration-200 active:translate-x-2 active:translate-y-2">
                                    <span className="font-black text-xl uppercase tracking-wider text-black">Collections</span>
                                </div>
                            </button>
                        </div>

                        
                        {customer && (
                            <div className="mt-12 p-6 border-4 border-black bg-[#C4B5FD] neo-shadow-sm rotate-1 hover:rotate-0 transition-transform">
                                <h2 className="text-2xl font-black uppercase mb-4 border-b-4 border-black pb-2">
                                    Welcome, {customer.fullname}
                                </h2>
                                <div className="space-y-2 font-bold text-black uppercase text-sm">
                                    <div className="flex items-center gap-2">
                                        <svg className="w-5 h-5 stroke-[3px]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                                        <span>NAME: {customer.fullname}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <svg className="w-5 h-5 stroke-[3px]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                                        <span>EMAIL: {customer.email}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <svg className="w-5 h-5 stroke-[3px]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                                        <span>PHONE: {customer.phone}</span>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Right Image/Collage Column */}
                <div className="relative z-10 flex-1 min-h-[60vh] md:min-h-full bg-black overflow-hidden flex items-center justify-center group border-t-4 md:border-t-0 border-black">
                    {/* Main Hero Image */}
                    <img
                        src="/img5.jpg"
                        alt="Streetwear Hero"
                        className="absolute inset-0 w-full h-full object-cover opacity-80 object-center mix-blend-luminosity group-hover:mix-blend-normal group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                        onError={(e) => { e.target.onerror = null; e.target.src = 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1200&auto=format&fit=crop'; }}
                    />

                    {/* Red Color Overlay for that raw aesthetic */}
                    <div className="absolute inset-0 bg-neo-accent mix-blend-multiply opacity-30 group-hover:opacity-0 transition-opacity duration-700 pointer-events-none"></div>

                    {/* Floating Collage Elements */}

                    {/* Barcode Sticker (Top Right) */}
                    <div className="absolute top-6 right-6 md:top-10 md:right-10 bg-white border-4 border-black p-3 rotate-6 neo-shadow-sm hover:rotate-0 transition-transform cursor-pointer z-20">
                        <div className="flex flex-col items-center">
                            <span className="font-black text-xs uppercase tracking-widest mb-1">Authentic</span>
                            <svg className="w-24 h-12" viewBox="0 0 100 40" fill="black" preserveAspectRatio="none">
                                <rect x="0" width="3" height="40" />
                                <rect x="5" width="1" height="40" />
                                <rect x="8" width="4" height="40" />
                                <rect x="14" width="2" height="40" />
                                <rect x="18" width="6" height="40" />
                                <rect x="26" width="2" height="40" />
                                <rect x="30" width="5" height="40" />
                                <rect x="37" width="1" height="40" />
                                <rect x="40" width="3" height="40" />
                                <rect x="45" width="2" height="40" />
                                <rect x="49" width="4" height="40" />
                                <rect x="55" width="1" height="40" />
                                <rect x="58" width="3" height="40" />
                                <rect x="63" width="6" height="40" />
                                <rect x="71" width="2" height="40" />
                                <rect x="75" width="4" height="40" />
                                <rect x="81" width="1" height="40" />
                                <rect x="84" width="5" height="40" />
                                <rect x="91" width="2" height="40" />
                                <rect x="95" width="5" height="40" />
                            </svg>
                            <span className="font-mono text-[10px] mt-1 font-bold">100% PAID</span>
                        </div>
                    </div>

                    {/* Fragile Tag (Bottom Left) */}
                    <div className="absolute bottom-10 left-6 md:bottom-16 md:left-12 bg-white border-4 border-black p-2 -rotate-12 neo-shadow-sm hover:rotate-0 transition-transform z-20">
                        <div className="border-2 border-black p-2 text-center">
                            <span className="block font-black text-3xl uppercase tracking-tighter text-neo-accent leading-none">Fragile</span>
                            <span className="block font-bold text-[10px] uppercase tracking-widest mt-1">Handle with care</span>
                        </div>
                    </div>

                    {/* Secondary overlapping image (like the subculture magazine cover) */}
                    <div className="hidden lg:block absolute -left-28 top-1/2 -translate-y-1/2 w-72 aspect-[3/4] border-4 border-black bg-white p-2 neo-shadow-lg rotate-6 group-hover:translate-x-32 group-hover:-rotate-3 transition-all duration-700 ease-out z-30 cursor-pointer">
                        <div className="relative w-full h-full border-2 border-black overflow-hidden">
                            <img
                                src="/img6.jpg"
                                alt="Subculture"
                                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                                onError={(e) => { e.target.onerror = null; e.target.src = 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?q=80&w=600&auto=format&fit=crop'; }}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                            <div className="absolute bottom-4 left-4 right-4">
                                <h3 className="text-white font-black text-3xl uppercase leading-none mb-1">Subculture</h3>
                                <p className="text-neo-secondary font-bold text-xs uppercase tracking-widest">Create. Destroy. Rebuild.</p>
                            </div>
                        </div>
                        <div className="absolute -top-4 -right-4 bg-neo-accent border-4 border-black px-3 py-1 rotate-12 neo-shadow-sm">
                            <span className="font-black text-sm text-black uppercase">SC-07</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* TRUST BAR (Marquee style representation) */}
            <section className="border-b-4 border-black bg-neo-muted overflow-hidden py-4 flex items-center whitespace-nowrap">
                <div className="flex w-max gap-8 items-center font-black text-xl uppercase tracking-widest px-4 animate-marquee hover:[animation-play-state:paused]">
                    {Array(4).fill(0).map((_, i) => (
                        <React.Fragment key={i}>
                            <span className="flex items-center gap-4">
                                <svg className="w-6 h-6 stroke-[3px]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                                LIGHTNING FAST
                            </span>
                            <span className="flex items-center gap-4">
                                <svg className="w-6 h-6 stroke-[3px]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                                SECURE PAYMENTS
                            </span>
                            <span className="flex items-center gap-4">
                                <svg className="w-6 h-6 stroke-[3px]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
                                FREE RETURNS
                            </span>
                        </React.Fragment>
                    ))}
                </div>
            </section>

            {/* COLLECTIONS GRID */}
            <section className="py-24 max-w-7xl mx-auto px-6 border-b-4 border-black">
                <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12">
                    <div className="relative">
                        <div className="absolute -top-6 -left-6 border-4 border-black bg-neo-secondary px-2 py-1 -rotate-6">
                            <span className="text-sm font-black uppercase tracking-widest text-black">Shop By</span>
                        </div>
                        <h2 className="text-5xl sm:text-6xl font-black tracking-tighter uppercase relative z-10 bg-white border-4 border-black px-4 py-2 neo-shadow-sm inline-block">
                            CATEGORIES
                        </h2>
                    </div>
                    <button 
                        type="button" 
                        onClick={() => navigate('/products')}
                        className="mt-8 sm:mt-0 font-black uppercase tracking-widest text-black hover:text-neo-accent transition-colors flex items-center gap-2 border-b-4 border-black pb-1 hover:border-neo-accent group cursor-pointer"
                    >
                        <span>View All</span>
                        <svg className="w-6 h-6 stroke-[4px] group-hover:translate-x-2 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                    </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Collection 1 */}
                    <div 
                        onClick={() => navigate('/products?category=Hoodies')}
                        className="group border-4 border-black bg-white p-4 neo-shadow-md hover:-translate-y-2 hover:neo-shadow-lg transition-all duration-200 cursor-pointer relative"
                    >
                        <div className="w-full aspect-[4/5] border-4 border-black bg-black flex items-center justify-center mb-6 overflow-hidden relative">
                            <img
                                src="/collection_hoodie.jpg"
                                alt="Hoodies"
                                className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-500"
                                onError={(e) => { e.target.onerror = null; e.target.src = 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=600&auto=format&fit=crop'; }}
                            />
                            <div className="absolute inset-0 bg-neo-accent mix-blend-multiply opacity-20 group-hover:opacity-0 transition-opacity"></div>
                        </div>
                        <h3 className="text-3xl font-black text-black uppercase mb-2">Hoodies</h3>
                        <p className="font-bold text-black border-2 border-black inline-block px-2">
                            {categoryCounts['Hoodies'] || 0} {categoryCounts['Hoodies'] === 1 ? 'DROP' : 'DROPS'}
                        </p>
                    </div>

                    {/* Collection 2 */}
                    <div 
                        onClick={() => navigate('/products?category=Sneakers')}
                        className="group border-4 border-black bg-white p-4 neo-shadow-md hover:-translate-y-2 hover:neo-shadow-lg transition-all duration-200 cursor-pointer relative top-0 lg:top-8"
                    >
                        <div className="w-full aspect-[4/5] border-4 border-black bg-black flex items-center justify-center mb-6 overflow-hidden relative">
                            <img
                                src="/collection_sneakers.jpg"
                                alt="Sneakers"
                                className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-500"
                                onError={(e) => { e.target.onerror = null; e.target.src = 'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?q=80&w=600&auto=format&fit=crop'; }}
                            />
                            <div className="absolute inset-0 bg-neo-secondary mix-blend-multiply opacity-20 group-hover:opacity-0 transition-opacity"></div>
                        </div>
                        <h3 className="text-3xl font-black text-black uppercase mb-2">Sneakers</h3>
                        <p className="font-bold text-black border-2 border-black inline-block px-2">
                            {categoryCounts['Sneakers'] || 0} {categoryCounts['Sneakers'] === 1 ? 'DROP' : 'DROPS'}
                        </p>
                    </div>

                    {/* Collection 3 */}
                    <div 
                        onClick={() => navigate('/products?category=Graphic Tees')}
                        className="group border-4 border-black bg-white p-4 neo-shadow-md hover:-translate-y-2 hover:neo-shadow-lg transition-all duration-200 cursor-pointer relative top-0 lg:-top-4"
                    >
                        <div className="w-full aspect-[4/5] border-4 border-black bg-black flex items-center justify-center mb-6 overflow-hidden relative">
                            <img
                                src="/collection_gtees.jpg"
                                alt="Graphic Tees"
                                className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-500"
                                onError={(e) => { e.target.onerror = null; e.target.src = 'https://images.unsplash.com/photo-1523398002811-999aa8d9512e?q=80&w=600&auto=format&fit=crop'; }}
                            />
                            <div className="absolute inset-0 bg-[#4ADE80] mix-blend-multiply opacity-20 group-hover:opacity-0 transition-opacity"></div>
                        </div>
                        <h3 className="text-3xl font-black text-black uppercase mb-2">Graphic Tees</h3>
                        <p className="font-bold text-black border-2 border-black inline-block px-2">
                            {categoryCounts['Graphic Tees'] || 0} {categoryCounts['Graphic Tees'] === 1 ? 'DROP' : 'DROPS'}
                        </p>
                    </div>

                    {/* Collection 4 */}
                    <div 
                        onClick={() => navigate('/products?category=Cargos')}
                        className="group border-4 border-black bg-white p-4 neo-shadow-md hover:-translate-y-2 hover:neo-shadow-lg transition-all duration-200 cursor-pointer relative top-0 lg:top-4"
                    >
                        <div className="w-full aspect-[4/5] border-4 border-black bg-black flex items-center justify-center mb-6 overflow-hidden relative">
                            <img
                                src="/collection_cargos.jpg"
                                alt="Cargos"
                                className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-500"
                                onError={(e) => { e.target.onerror = null; e.target.src = 'https://images.unsplash.com/photo-1521369909029-2afed882ba9d?q=80&w=600&auto=format&fit=crop'; }}
                            />
                            <div className="absolute inset-0 bg-[#C4B5FD] mix-blend-multiply opacity-20 group-hover:opacity-0 transition-opacity"></div>
                        </div>
                        <h3 className="text-3xl font-black text-black uppercase mb-2">Cargos</h3>
                        <p className="font-bold text-black border-2 border-black inline-block px-2">
                            {categoryCounts['Cargos'] || 0} {categoryCounts['Cargos'] === 1 ? 'DROP' : 'DROPS'}
                        </p>
                    </div>
                </div>
            </section>

            {/* WHY NOISE — VALUE PROPOSITIONS */}
            <section className="py-24 max-w-7xl mx-auto px-6 border-b-4 border-black bg-[#FFD93D]">
                <div className="text-center max-w-3xl mx-auto mb-16 relative">
                    <h2 className="text-6xl sm:text-7xl font-black tracking-tighter uppercase text-black mb-6">
                        BUILT DIFFERENT.
                    </h2>
                    <p className="text-black text-xl font-bold uppercase border-y-4 border-black py-4 bg-white rotate-1">
                        NO FILLER. NO COMPROMISE. ONLY APPAREL THAT MEETS OUR OBSESSIVE QUALITY STANDARDS.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Value 1 */}
                    <div className="bg-white border-4 border-black p-8 neo-shadow-md rotate-1 hover:rotate-0 transition-transform">
                        <div className="w-16 h-16 border-4 border-black bg-[#C4B5FD] flex items-center justify-center mb-6 neo-shadow-sm rounded-full">
                            <span className="text-2xl font-black">1</span>
                        </div>
                        <h3 className="text-2xl font-black mb-4 uppercase">CURATED SELECTION</h3>
                        <p className="text-black font-bold text-sm uppercase leading-relaxed">
                            WE HANDPICK EVERY ITEM. IF IT'S NOT GOOD ENOUGH FOR US, IT'S NOT IN THE STORE. PERIOD.
                        </p>
                    </div>

                    {/* Value 2 */}
                    <div className="bg-[#FF6B6B] border-4 border-black p-8 neo-shadow-md -rotate-1 hover:rotate-0 transition-transform">
                        <div className="w-16 h-16 border-4 border-black bg-white flex items-center justify-center mb-6 neo-shadow-sm rounded-full">
                            <span className="text-2xl font-black">2</span>
                        </div>
                        <h3 className="text-2xl font-black mb-4 uppercase text-black">RAW DESIGN</h3>
                        <p className="text-black font-bold text-sm uppercase leading-relaxed">
                            OUR BRAND DNA IS BUILT AROUND LOUD AESTHETICS. EVERY PACKAGE REFLECTS THAT IDENTITY.
                        </p>
                    </div>

                    {/* Value 3 */}
                    <div className="bg-white border-4 border-black p-8 neo-shadow-md rotate-2 hover:rotate-0 transition-transform">
                        <div className="w-16 h-16 border-4 border-black bg-[#4ADE80] flex items-center justify-center mb-6 neo-shadow-sm rounded-full">
                            <span className="text-2xl font-black">3</span>
                        </div>
                        <h3 className="text-2xl font-black mb-4 uppercase">LIGHTNING FAST</h3>
                        <p className="text-black font-bold text-sm uppercase leading-relaxed">
                            FROM BROWSING TO CHECKOUT IN SECONDS. NOTHING STANDS BETWEEN YOU AND THE DROP.
                        </p>
                    </div>
                </div>
            </section>

            {/* NEWSLETTER CTA */}
            <section className="py-24 relative bg-neo-bg">
                <div className="max-w-4xl mx-auto px-6">
                    <div className="relative border-4 border-black bg-[#C4B5FD] p-10 sm:p-16 text-center neo-shadow-lg -rotate-1">
                        <div className="absolute -top-6 -right-6 border-4 border-black bg-[#FF6B6B] px-4 py-2 rotate-12 neo-shadow-sm">
                            <span className="font-black text-xl uppercase text-black">NO SPAM</span>
                        </div>

                        <h2 className="text-5xl sm:text-6xl font-black tracking-tighter uppercase mb-6 text-black">
                            JOIN THE KULT
                        </h2>
                        <p className="text-black font-bold text-lg mb-8 uppercase max-w-xl mx-auto">
                            BE THE FIRST TO KNOW ABOUT NEW COLLECTIONS AND LIMITED RELEASES.
                        </p>

                        {/* Email Input & Subscribe Form */}
                        <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-lg mx-auto mb-4">
                            <input
                                type="email"
                                value={newsletterEmail}
                                onChange={(e) => setNewsletterEmail(e.target.value)}
                                placeholder="YOUR@EMAIL.COM"
                                disabled={subscribeStatus === 'loading'}
                                className="w-full sm:flex-1 h-14 px-4 bg-white border-4 border-black focus:outline-none focus:bg-neo-secondary focus:neo-shadow-sm transition-all font-bold text-black placeholder:text-black/40"
                            />
                            <button 
                                type="submit" 
                                disabled={subscribeStatus === 'loading'}
                                className="relative group w-full sm:w-auto cursor-pointer block"
                            >
                                <div className="absolute inset-0 bg-black translate-x-1.5 translate-y-1.5 group-active:translate-x-0 group-active:translate-y-0 transition-transform duration-100" />
                                <div className="relative h-14 bg-black px-8 py-4 flex items-center justify-center transition-transform duration-100 group-active:translate-x-1.5 group-active:translate-y-1.5">
                                    <span className="font-black text-lg uppercase tracking-wider text-white">
                                        {subscribeStatus === 'loading' ? 'SUBSCRIBING...' : 'SUBSCRIBE'}
                                    </span>
                                </div>
                            </button>
                        </form>

                        {/* Feedback Alerts */}
                        {subscribeStatus === 'success' && (
                            <div className="inline-block mt-4 border-4 border-black bg-[#4ADE80] text-black px-4 py-2 font-black text-sm uppercase tracking-wide neo-shadow-sm">
                                ⚡ {subscribeMsg}
                            </div>
                        )}
                        {subscribeStatus === 'error' && (
                            <div className="inline-block mt-4 border-4 border-black bg-[#FF4545] text-white px-4 py-2 font-black text-sm uppercase tracking-wide neo-shadow-sm">
                                ❌ {subscribeMsg}
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* FOOTER */}
            <Footer />
        </div>
    );
};

export default Home;
