import React from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';

const Landing = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-neo-bg text-neo-ink font-sans selection:bg-neo-accent selection:text-white flex flex-col justify-between overflow-x-hidden">
            
            {/* Top Ticker */}
            <div className="bg-black text-white py-2 px-4 border-b-4 border-black overflow-hidden whitespace-nowrap">
                <div className="inline-block animate-marquee font-black uppercase text-xs sm:text-sm tracking-widest">
                    ⚡ DROP 06 NOW LIVE // 100% HEAVYWEIGHT ORGANIC COTTON // NO COMPROMISE // ZERO CORPORATE BS // LIMITED QUANTITIES ONLY // FREE DOMESTIC SHIPPING OVER ₹5000 ⚡
                </div>
            </div>

            {/* Navigation Bar for Guests */}
            <header className="sticky top-0 z-40 bg-neo-bg border-b-4 border-black">
                <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                    {/* Brand Logo */}
                    <div className="flex items-center gap-3 cursor-pointer group" onClick={() => navigate('/')}>
                        <div className="relative inline-block select-none font-sans">
                            <div className="absolute inset-0 bg-black translate-x-1 translate-y-1 group-active:translate-x-0 group-active:translate-y-0 transition-transform duration-100" />
                            <div className="relative border-4 border-black bg-neo-secondary px-3 py-1 transition-transform duration-100 group-active:translate-x-1 group-active:translate-y-1">
                                <span className="font-black text-2xl tracking-tighter text-black uppercase leading-none">
                                    NOISE.
                                </span>
                            </div>
                        </div>
                        <span className="hidden sm:inline-block border-2 border-black bg-neo-accent text-black font-black text-xs px-2 py-0.5 uppercase tracking-widest -rotate-2">
                            EST. 2026
                        </span>
                    </div>

                    {/* Navigation Links */}
                    <nav className="hidden md:flex items-center gap-8 text-sm font-bold tracking-widest uppercase">
                        <button onClick={() => navigate('/about')} className="hover:text-neo-accent hover:-translate-y-0.5 transition-transform cursor-pointer font-black">
                            About
                        </button>
                        <button onClick={() => navigate('/faq')} className="hover:text-neo-accent hover:-translate-y-0.5 transition-transform cursor-pointer font-black">
                            FAQ
                        </button>
                        <button onClick={() => navigate('/returns')} className="hover:text-neo-accent hover:-translate-y-0.5 transition-transform cursor-pointer font-black">
                            Returns
                        </button>
                    </nav>

                    {/* Auth CTAs */}
                    <div className="flex items-center gap-3">
                        <button
                            type="button"
                            onClick={() => navigate('/login')}
                            className="border-3 border-black bg-white px-4 py-2 font-black uppercase text-xs sm:text-sm tracking-wider hover:bg-black hover:text-white transition-colors cursor-pointer"
                        >
                            Log In
                        </button>
                        <button
                            type="button"
                            onClick={() => navigate('/signup')}
                            className="relative group cursor-pointer inline-block"
                        >
                            <div className="absolute inset-0 bg-black translate-x-1 translate-y-1 group-active:translate-x-0 group-active:translate-y-0 transition-transform duration-100" />
                            <div className="relative border-3 border-black bg-neo-secondary text-black px-4 py-2 font-black uppercase text-xs sm:text-sm tracking-wider transition-transform duration-100 group-active:translate-x-1 group-active:translate-y-1">
                                Join Kult
                            </div>
                        </button>
                    </div>
                </div>
            </header>

            {/* Hero Section */}
            <main className="flex-grow">
                <section className="max-w-7xl mx-auto px-6 pt-12 pb-20 md:py-24">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                        
                        {/* Left Column: Headlines & CTA */}
                        <div className="lg:col-span-7">
                            <div className="flex flex-wrap items-center gap-3 mb-6">
                                <span className="bg-neo-secondary border-4 border-black px-3 py-1 font-black text-xs uppercase -rotate-2 neo-shadow-sm">
                                    DROP 06 // ACTIVE
                                </span>
                                <span className="bg-[#4ADE80] border-4 border-black px-3 py-1 font-black text-xs uppercase rotate-2 neo-shadow-sm">
                                    HEAVYWEIGHT 240+ GSM
                                </span>
                                <span className="bg-[#FF6B6B] text-white border-4 border-black px-3 py-1 font-black text-xs uppercase -rotate-1 neo-shadow-sm">
                                    ZERO COMPROMISE
                                </span>
                            </div>

                            <h1 className="text-6xl sm:text-7xl lg:text-8xl font-black uppercase tracking-tighter leading-[0.9] mb-8">
                                RAW STREETWEAR.<br />
                                <span className="bg-neo-secondary text-black px-3 py-1 inline-block border-4 border-black -rotate-1 neo-shadow-sm">
                                    UNFILTERED
                                </span><br />
                                ATTITUDE.
                            </h1>

                            <p className="font-bold text-lg sm:text-xl uppercase border-l-8 border-black pl-6 bg-white p-4 neo-shadow-md mb-10 max-w-2xl leading-relaxed">
                                Boxy cuts, heavyweight textiles, and raw brutalist aesthetics. We design for the unapologetic and the style-obsessed. No restocks, ever.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4 max-w-lg">
                                <button
                                    onClick={() => navigate('/login')}
                                    className="relative group cursor-pointer flex-1"
                                >
                                    <div className="absolute inset-0 bg-black translate-x-2 translate-y-2 group-active:translate-x-0 group-active:translate-y-0 transition-transform duration-100" />
                                    <div className="relative border-4 border-black bg-neo-secondary text-black p-4 sm:p-5 text-center font-black uppercase tracking-widest text-lg transition-transform duration-100 group-active:translate-x-2 group-active:translate-y-2">
                                        ENTER THE VAULT ➔
                                    </div>
                                </button>

                                <button
                                    onClick={() => navigate('/signup')}
                                    className="border-4 border-black bg-white p-4 sm:p-5 text-center font-black uppercase tracking-widest text-lg hover:bg-neo-secondary transition-colors cursor-pointer"
                                >
                                    CREATE ACCOUNT
                                </button>
                            </div>

                            {/* Trust Signals */}
                            <div className="grid grid-cols-3 gap-4 mt-12 border-t-4 border-black pt-8">
                                <div>
                                    <h4 className="font-black text-2xl sm:text-3xl">100%</h4>
                                    <p className="font-bold text-xs uppercase text-gray-700">HEAVYWEIGHT COTTON</p>
                                </div>
                                <div>
                                    <h4 className="font-black text-2xl sm:text-3xl">&lt; 200</h4>
                                    <p className="font-bold text-xs uppercase text-gray-700">PIECES PER DROP</p>
                                </div>
                                <div>
                                    <h4 className="font-black text-2xl sm:text-3xl">24/7</h4>
                                    <p className="font-bold text-xs uppercase text-gray-700">INSTANT RAZORPAY</p>
                                </div>
                            </div>
                        </div>

                        {/* Right Column: Visual Stash */}
                        <div className="lg:col-span-5 relative">
                            <div className="relative border-8 border-black bg-white p-4 neo-shadow-lg rotate-2 hover:rotate-0 transition-transform duration-300">
                                <div className="aspect-[4/5] overflow-hidden border-4 border-black relative">
                                    <img
                                        src="/img.jpg"
                                        alt="NOISE Streetwear Lookbook"
                                        className="w-full h-full object-cover transition-all duration-300"
                                        onError={(e) => {
                                            e.target.onerror = null;
                                            e.target.src = 'https://images.unsplash.com/photo-1523398002811-999aa8d9512e?q=80&w=800';
                                        }}
                                    />
                                    {/* Sticker badge */}
                                    <div className="absolute top-4 left-4 bg-neo-accent border-4 border-black px-3 py-1 font-black text-xs uppercase -rotate-6 neo-shadow-sm">
                                        EXCLUSIVE DROP 06
                                    </div>
                                    <div className="absolute bottom-4 right-4 bg-white border-4 border-black px-3 py-1 font-black text-xs uppercase rotate-3 neo-shadow-sm">
                                        AUTHENTIC NOISE®
                                    </div>
                                </div>

                                <div className="mt-4 flex items-center justify-between border-t-4 border-black pt-3">
                                    <div>
                                        <h3 className="font-black text-lg uppercase">OVERSIZED GRAPHIC HOODIE</h3>
                                        <p className="font-bold text-xs text-gray-600 uppercase">HEAVYWEIGHT 450 GSM FRENCH TERRY</p>
                                    </div>
                                    <span className="font-black text-xl bg-neo-secondary px-3 py-1 border-2 border-black">
                                        ₹2,999
                                    </span>
                                </div>
                            </div>
                        </div>

                    </div>
                </section>

                {/* Categories Banner */}
                <section className="bg-neo-secondary border-y-8 border-black py-16">
                    <div className="max-w-7xl mx-auto px-6">
                        <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-12 border-b-4 border-black pb-6 gap-4">
                            <div>
                                <span className="bg-white border-2 border-black px-3 py-1 font-black text-xs uppercase tracking-widest inline-block mb-2">
                                    CURATED CATEGORIES
                                </span>
                                <h2 className="text-4xl sm:text-6xl font-black uppercase tracking-tight">
                                    THE ESSENTIALS.
                                </h2>
                            </div>
                            <button
                                onClick={() => navigate('/login')}
                                className="border-4 border-black bg-white px-6 py-3 font-black uppercase text-sm tracking-widest hover:bg-black hover:text-white transition-colors cursor-pointer"
                            >
                                EXPLORE ALL ➔
                            </button>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {[
                                { title: 'HOODIES', img: '/collection_hoodie.jpg', tag: 'HEAVYWEIGHT' },
                                { title: 'SNEAKERS', img: '/collection_sneakers.jpg', tag: 'CHUNKY SOLES' },
                                { title: 'GRAPHIC TEES', img: '/collection_gtees.jpg', tag: '240 GSM' },
                                { title: 'CARGOS', img: '/collection_cargos.jpg', tag: 'MULTI-POCKET' }
                            ].map((item, idx) => (
                                <div
                                    key={idx}
                                    onClick={() => navigate('/login')}
                                    className="border-4 border-black bg-white p-4 neo-shadow-md hover:-translate-y-2 hover:neo-shadow-lg transition-all cursor-pointer group"
                                >
                                    <div className="aspect-square border-4 border-black bg-neo-bg overflow-hidden mb-4 relative">
                                        <img
                                            src={item.img}
                                            alt={item.title}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-all duration-300"
                                            onError={(e) => {
                                                e.target.onerror = null;
                                                e.target.src = 'https://images.unsplash.com/photo-1523398002811-999aa8d9512e?q=80&w=600';
                                            }}
                                        />
                                        <span className="absolute top-2 left-2 bg-neo-accent border-2 border-black px-2 py-0.5 text-[10px] font-black uppercase tracking-wider">
                                            {item.tag}
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <h3 className="font-black text-xl uppercase">{item.title}</h3>
                                        <span className="font-black text-lg group-hover:translate-x-1 transition-transform">➔</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* The Noise Code / Features */}
                <section className="max-w-7xl mx-auto px-6 py-20">
                    <div className="border-4 border-black bg-white p-8 md:p-12 neo-shadow-lg">
                        <div className="mb-10 border-b-4 border-black pb-6">
                            <span className="bg-[#C4B5FD] border-2 border-black px-3 py-1 font-black text-xs uppercase tracking-widest inline-block mb-3 -rotate-1">
                                OUR PROMISE
                            </span>
                            <h2 className="text-4xl sm:text-5xl font-black uppercase tracking-tight">
                                BUILT TO OUTLAST THE HYPE.
                            </h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div className="border-4 border-black p-6 bg-neo-bg neo-shadow-sm">
                                <span className="text-4xl block mb-4">🧵</span>
                                <h3 className="text-xl font-black uppercase mb-2">CUSTOM FABRICATIONS</h3>
                                <p className="font-bold text-sm uppercase text-gray-700 leading-relaxed">
                                    Pre-shrunk, heavyweight combed cotton engineered for structural drape that won't lose shape in the wash.
                                </p>
                            </div>

                            <div className="border-4 border-black p-6 bg-neo-bg neo-shadow-sm">
                                <span className="text-4xl block mb-4">🔒</span>
                                <h3 className="text-xl font-black uppercase mb-2">SECURE CHECKOUT</h3>
                                <p className="font-bold text-sm uppercase text-gray-700 leading-relaxed">
                                    Powered by Razorpay standard gateway with instant payment verification, encrypted sessions, and tracking.
                                </p>
                            </div>

                            <div className="border-4 border-black p-6 bg-neo-bg neo-shadow-sm">
                                <span className="text-4xl block mb-4">📦</span>
                                <h3 className="text-xl font-black uppercase mb-2">LIMITED BATCH RUNS</h3>
                                <p className="font-bold text-sm uppercase text-gray-700 leading-relaxed">
                                    Once a drop is sold out, it is permanently locked in the archive. We do not reprint or restock past drops.
                                </p>
                            </div>
                        </div>

                        {/* Bottom CTA Banner */}
                        <div className="mt-12 bg-black text-white p-8 border-4 border-black flex flex-col md:flex-row items-center justify-between gap-6">
                            <div>
                                <h3 className="text-2xl sm:text-3xl font-black uppercase tracking-tight">
                                    READY TO STEP INTO THE NOISE?
                                </h3>
                                <p className="font-bold text-sm text-gray-400 uppercase mt-1">
                                    Create your customer account to unlock live inventory and checkout.
                                </p>
                            </div>
                            <div className="flex gap-4">
                                <button
                                    onClick={() => navigate('/signup')}
                                    className="border-3 border-white bg-neo-primary text-black px-6 py-3 font-black uppercase text-sm tracking-widest hover:bg-white transition-colors cursor-pointer"
                                >
                                    SIGN UP NOW ➔
                                </button>
                                <button
                                    onClick={() => navigate('/login')}
                                    className="border-3 border-white bg-transparent text-white px-6 py-3 font-black uppercase text-sm tracking-widest hover:bg-white hover:text-black transition-colors cursor-pointer"
                                >
                                    LOG IN
                                </button>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            {/* Footer */}
            <Footer />

        </div>
    );
};

export default Landing;
