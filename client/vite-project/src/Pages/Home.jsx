import React from 'react';

const Home = () => {
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

            {/* ═══════════════════════════════════════════════════════ */}
            {/* NAVBAR */}
            {/* ═══════════════════════════════════════════════════════ */}
            <header className="sticky top-0 z-50 bg-neo-bg border-b-4 border-black">
                <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                    {/* Brand Logo */}
                    <div className="flex items-center gap-3 cursor-pointer group">
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
                        <span className="hover:text-neo-accent hover:-translate-y-0.5 transition-transform cursor-pointer flex items-center gap-2">
                            New Drops
                            <span className="w-2 h-2 border-2 border-black rounded-full bg-neo-accent animate-pulse"></span>
                        </span>
                        <span className="hover:text-neo-accent hover:-translate-y-0.5 transition-transform cursor-pointer">Collections</span>
                        <span className="hover:text-neo-accent hover:-translate-y-0.5 transition-transform cursor-pointer">Trending</span>
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
                        <button type="button" className="relative w-10 h-10 flex items-center justify-center border-4 border-black bg-neo-muted neo-shadow-sm hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none transition-all">
                            <svg className="w-5 h-5 stroke-[3px]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007z" />
                            </svg>
                            <span className="absolute -top-3 -right-3 w-6 h-6 bg-neo-accent border-2 border-black flex items-center justify-center text-xs font-black rotate-6">0</span>
                        </button>
                        
                        {/* Logout Button (Redesigned to Neo-Brutalism) */}
                        <button 
                            type="button" 
                            className="relative group px-4 py-2 font-bold uppercase tracking-wider text-sm flex items-center gap-2 cursor-pointer"
                        >
                            <div className="absolute inset-0 bg-black translate-x-1.5 translate-y-1.5 group-active:translate-x-0 group-active:translate-y-0 transition-transform duration-100" />
                            <div className="relative border-4 border-black bg-[#FF4545] text-black px-4 py-2 transition-transform duration-100 group-active:translate-x-1.5 group-active:translate-y-1.5 flex items-center gap-2">
                                <svg className="w-4 h-4 stroke-[3px]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
                                </svg>
                                <span>Logout</span>
                            </div>
                        </button>
                    </div>
                </div>
            </header>

            {/* ═══════════════════════════════════════════════════════ */}
            {/* HERO SECTION */}
            {/* ═══════════════════════════════════════════════════════ */}
            <section className="relative pt-20 pb-16 md:pt-28 md:pb-24 max-w-7xl mx-auto px-6 border-b-4 border-black">
                <div className="flex flex-col items-center text-center">
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 px-4 py-2 border-4 border-black bg-neo-accent neo-shadow-sm mb-10 -rotate-2 hover:rotate-0 transition-transform">
                        <span className="w-3 h-3 rounded-full bg-white border-2 border-black animate-pulse"></span>
                        <span className="text-sm font-black uppercase tracking-widest text-black">New Season Drop — Now Live</span>
                    </div>

                    {/* Headline */}
                    <h1 className="text-6xl sm:text-8xl md:text-9xl font-black tracking-tighter leading-[0.85] mb-8 uppercase relative z-10">
                        Wear The <br />
                        <span className="text-neo-bg text-stroke-black drop-shadow-[8px_8px_0_rgba(0,0,0,1)] relative inline-block">
                            FUTURE.
                            {/* Decorative Star */}
                            <svg className="absolute -top-8 -right-12 w-16 h-16 fill-neo-secondary stroke-black stroke-[3px] animate-[spin_10s_linear_infinite] -z-10" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                            </svg>
                        </span>
                    </h1>

                    <p className="text-black font-bold text-lg sm:text-xl max-w-2xl uppercase border-4 border-black bg-white p-4 neo-shadow-sm rotate-1 mb-12">
                        Curated goods for those who refuse to blend in. No corporate aesthetics. Just raw, unfiltered drops.
                    </p>

                    {/* CTA Row */}
                    <div className="flex flex-col sm:flex-row items-center gap-6 w-full sm:w-auto">
                        {/* Primary Button */}
                        <button type="button" className="relative group w-full sm:w-auto cursor-pointer block">
                            <div className="absolute inset-0 bg-black translate-x-2 translate-y-2 group-active:translate-x-0 group-active:translate-y-0 transition-transform duration-100" />
                            <div className="relative border-4 border-black bg-neo-secondary px-8 py-4 flex items-center justify-center gap-3 transition-transform duration-100 group-active:translate-x-2 group-active:translate-y-2">
                                <span className="font-black text-xl uppercase tracking-wider text-black">Shop Drops</span>
                                <svg className="w-6 h-6 stroke-[3px]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                </svg>
                            </div>
                        </button>
                        
                        {/* Secondary Button */}
                        <button type="button" className="relative group w-full sm:w-auto cursor-pointer block">
                            <div className="absolute inset-0 bg-black translate-x-2 translate-y-2 group-active:translate-x-0 group-active:translate-y-0 transition-transform duration-100" />
                            <div className="relative border-4 border-black bg-white px-8 py-4 flex items-center justify-center gap-3 transition-transform duration-100 group-active:translate-x-2 group-active:translate-y-2">
                                <span className="font-black text-xl uppercase tracking-wider text-black">Collections</span>
                            </div>
                        </button>
                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════════ */}
            {/* TRUST BAR (Marquee style representation) */}
            {/* ═══════════════════════════════════════════════════════ */}
            <section className="border-b-4 border-black bg-neo-muted overflow-hidden py-4 flex items-center whitespace-nowrap">
                <div className="flex gap-8 items-center font-black text-xl uppercase tracking-widest px-4 animate-[slide_20s_linear_infinite]">
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

            {/* ═══════════════════════════════════════════════════════ */}
            {/* COLLECTIONS GRID */}
            {/* ═══════════════════════════════════════════════════════ */}
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
                    <button type="button" className="mt-8 sm:mt-0 font-black uppercase tracking-widest text-black hover:text-neo-accent transition-colors flex items-center gap-2 border-b-4 border-black pb-1 hover:border-neo-accent">
                        <span>View All</span>
                        <svg className="w-6 h-6 stroke-[4px]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                    </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Collection 1 */}
                    <div className="group border-4 border-black bg-white p-6 neo-shadow-md hover:-translate-y-2 hover:neo-shadow-lg transition-all duration-200 cursor-pointer relative">
                        <div className="w-full aspect-square border-4 border-black bg-[#C4B5FD] flex items-center justify-center mb-6">
                            <span className="text-6xl">👕</span>
                        </div>
                        <h3 className="text-3xl font-black text-black uppercase mb-2">Apparel</h3>
                        <p className="font-bold text-black border-2 border-black inline-block px-2">42 DROPS</p>
                    </div>

                    {/* Collection 2 */}
                    <div className="group border-4 border-black bg-white p-6 neo-shadow-md hover:-translate-y-2 hover:neo-shadow-lg transition-all duration-200 cursor-pointer relative top-0 lg:top-8">
                        <div className="w-full aspect-square border-4 border-black bg-[#FFD93D] flex items-center justify-center mb-6">
                            <span className="text-6xl">⌚</span>
                        </div>
                        <h3 className="text-3xl font-black text-black uppercase mb-2">Watches</h3>
                        <p className="font-bold text-black border-2 border-black inline-block px-2">28 DROPS</p>
                    </div>

                    {/* Collection 3 */}
                    <div className="group border-4 border-black bg-white p-6 neo-shadow-md hover:-translate-y-2 hover:neo-shadow-lg transition-all duration-200 cursor-pointer relative top-0 lg:-top-4">
                        <div className="w-full aspect-square border-4 border-black bg-[#FF6B6B] flex items-center justify-center mb-6">
                            <span className="text-6xl">🎧</span>
                        </div>
                        <h3 className="text-3xl font-black text-black uppercase mb-2">Tech</h3>
                        <p className="font-bold text-black border-2 border-black inline-block px-2">35 DROPS</p>
                    </div>

                    {/* Collection 4 */}
                    <div className="group border-4 border-black bg-white p-6 neo-shadow-md hover:-translate-y-2 hover:neo-shadow-lg transition-all duration-200 cursor-pointer relative top-0 lg:top-4">
                        <div className="w-full aspect-square border-4 border-black bg-[#4ADE80] flex items-center justify-center mb-6">
                            <span className="text-6xl">🕶️</span>
                        </div>
                        <h3 className="text-3xl font-black text-black uppercase mb-2">Accessories</h3>
                        <p className="font-bold text-black border-2 border-black inline-block px-2">56 DROPS</p>
                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════════ */}
            {/* WHY VELOX — VALUE PROPOSITIONS */}
            {/* ═══════════════════════════════════════════════════════ */}
            <section className="py-24 max-w-7xl mx-auto px-6 border-b-4 border-black bg-[#FFD93D]">
                <div className="text-center max-w-3xl mx-auto mb-16 relative">
                    <h2 className="text-6xl sm:text-7xl font-black tracking-tighter uppercase text-black mb-6">
                        BUILT DIFFERENT.
                    </h2>
                    <p className="text-black text-xl font-bold uppercase border-y-4 border-black py-4 bg-white rotate-1">
                        NO FILLER. NO COMPROMISE. ONLY GOODS THAT MEET OUR OBSESSIVE QUALITY STANDARDS.
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

            {/* ═══════════════════════════════════════════════════════ */}
            {/* NEWSLETTER CTA */}
            {/* ═══════════════════════════════════════════════════════ */}
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

                        {/* Email Input */}
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-lg mx-auto">
                            <input 
                                type="email"
                                placeholder="YOUR@EMAIL.COM"
                                className="w-full sm:flex-1 h-14 px-4 bg-white border-4 border-black focus:outline-none focus:bg-neo-secondary focus:neo-shadow-sm transition-all font-bold text-black placeholder:text-black/40"
                            />
                            <button type="button" className="relative group w-full sm:w-auto cursor-pointer block">
                                <div className="absolute inset-0 bg-black translate-x-1.5 translate-y-1.5 group-active:translate-x-0 group-active:translate-y-0 transition-transform duration-100" />
                                <div className="relative h-14 bg-black px-8 py-4 flex items-center justify-center transition-transform duration-100 group-active:translate-x-1.5 group-active:translate-y-1.5">
                                    <span className="font-black text-lg uppercase tracking-wider text-white">SUBSCRIBE</span>
                                </div>
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════════ */}
            {/* FOOTER */}
            {/* ═══════════════════════════════════════════════════════ */}
            <footer className="border-t-8 border-black bg-white pt-16 pb-8 relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-6 relative z-10">
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-12 mb-16">
                        {/* Column 1: Brand */}
                        <div className="col-span-2 sm:col-span-1">
                            <div className="inline-block border-4 border-black bg-neo-secondary px-3 py-1 mb-6 -rotate-2 neo-shadow-sm">
                                <span className="font-black text-3xl tracking-tighter text-black uppercase leading-none">NOISE.</span>
                            </div>
                            <p className="font-bold text-sm uppercase text-black border-l-4 border-black pl-4">
                                RAW E-COMMERCE FOR THE DESIGN-OBSESSED.
                            </p>
                        </div>

                        {/* Column 2: Shop */}
                        <div>
                            <h4 className="text-lg font-black uppercase tracking-widest text-black mb-6 bg-[#FF6B6B] border-4 border-black px-2 py-1 inline-block rotate-1">SHOP</h4>
                            <ul className="space-y-4 font-bold text-sm uppercase">
                                <li className="hover:text-neo-accent cursor-pointer transition-colors flex items-center gap-2 hover:translate-x-2 duration-200">
                                    <svg className="w-4 h-4 stroke-[4px]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
                                    New Drops
                                </li>
                                <li className="hover:text-neo-accent cursor-pointer transition-colors flex items-center gap-2 hover:translate-x-2 duration-200">
                                    <svg className="w-4 h-4 stroke-[4px]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
                                    Best Sellers
                                </li>
                                <li className="hover:text-neo-accent cursor-pointer transition-colors flex items-center gap-2 hover:translate-x-2 duration-200">
                                    <svg className="w-4 h-4 stroke-[4px]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
                                    Collections
                                </li>
                            </ul>
                        </div>

                        {/* Column 3: Company */}
                        <div>
                            <h4 className="text-lg font-black uppercase tracking-widest text-black mb-6 bg-[#4ADE80] border-4 border-black px-2 py-1 inline-block -rotate-1">COMPANY</h4>
                            <ul className="space-y-4 font-bold text-sm uppercase">
                                <li className="hover:text-neo-accent cursor-pointer transition-colors flex items-center gap-2 hover:translate-x-2 duration-200">
                                    <svg className="w-4 h-4 stroke-[4px]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
                                    About Us
                                </li>
                                <li className="hover:text-neo-accent cursor-pointer transition-colors flex items-center gap-2 hover:translate-x-2 duration-200">
                                    <svg className="w-4 h-4 stroke-[4px]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
                                    Careers
                                </li>
                                <li className="hover:text-neo-accent cursor-pointer transition-colors flex items-center gap-2 hover:translate-x-2 duration-200">
                                    <svg className="w-4 h-4 stroke-[4px]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
                                    Press
                                </li>
                            </ul>
                        </div>

                        {/* Column 4: Support */}
                        <div>
                            <h4 className="text-lg font-black uppercase tracking-widest text-black mb-6 bg-[#C4B5FD] border-4 border-black px-2 py-1 inline-block rotate-2">SUPPORT</h4>
                            <ul className="space-y-4 font-bold text-sm uppercase">
                                <li className="hover:text-neo-accent cursor-pointer transition-colors flex items-center gap-2 hover:translate-x-2 duration-200">
                                    <svg className="w-4 h-4 stroke-[4px]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
                                    FAQ
                                </li>
                                <li className="hover:text-neo-accent cursor-pointer transition-colors flex items-center gap-2 hover:translate-x-2 duration-200">
                                    <svg className="w-4 h-4 stroke-[4px]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
                                    Returns
                                </li>
                                <li className="hover:text-neo-accent cursor-pointer transition-colors flex items-center gap-2 hover:translate-x-2 duration-200">
                                    <svg className="w-4 h-4 stroke-[4px]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
                                    Size Guide
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Footer Bottom */}
                    <div className="pt-8 border-t-4 border-black flex flex-col sm:flex-row items-center justify-between gap-6">
                        <p className="font-black text-sm uppercase bg-black text-white px-3 py-1 rotate-1">
                            &copy; 2026 NOISE. ALL RIGHTS RESERVED.
                        </p>
                        <div className="flex items-center gap-6 font-bold text-sm uppercase">
                            <span className="hover:text-neo-accent cursor-pointer transition-colors border-b-2 border-black hover:border-neo-accent pb-0.5">Privacy</span>
                            <span className="hover:text-neo-accent cursor-pointer transition-colors border-b-2 border-black hover:border-neo-accent pb-0.5">Terms</span>
                        </div>
                    </div>
                </div>
                
                {/* Background decorative text */}
                <div className="absolute -bottom-20 left-0 w-full text-center overflow-hidden pointer-events-none opacity-5">
                    <span className="text-[20vw] font-black uppercase whitespace-nowrap">NOISE.</span>
                </div>
            </footer>
        </div>
    );
};

export default Home;
