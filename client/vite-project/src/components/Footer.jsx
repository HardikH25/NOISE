import React from 'react';
import { useNavigate } from 'react-router-dom';

const Footer = () => {
    const navigate = useNavigate();

    return (
        <footer className="border-t-8 border-black bg-white pt-16 pb-8 relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-16">
                    {/* Column 1: Brand */}
                    <div className="sm:col-span-2 lg:col-span-1">
                        <div 
                            onClick={() => navigate('/home')}
                            className="inline-block border-4 border-black bg-neo-secondary px-3 py-1 mb-6 -rotate-2 neo-shadow-sm cursor-pointer hover:rotate-0 transition-transform"
                        >
                            <span className="font-black text-3xl tracking-tighter text-black uppercase leading-none">NOISE.</span>
                        </div>
                        <p className="font-bold text-sm uppercase text-black border-l-4 border-black pl-4 mb-4 leading-relaxed">
                            RAW STREETWEAR FOR THE DESIGN-OBSESSED. NO FILLER. NO COMPROMISE.
                        </p>
                        <span className="inline-block border-2 border-black bg-[#4ADE80] text-black font-black text-xs px-2 py-0.5 uppercase tracking-widest">
                            DROP 06 ACTIVE
                        </span>
                    </div>

                    {/* Column 2: Explore */}
                    <div>
                        <h4 className="text-base font-black uppercase tracking-widest text-black mb-6 bg-[#FF6B6B] border-4 border-black px-3 py-1 inline-block rotate-1 neo-shadow-sm">
                            EXPLORE
                        </h4>
                        <ul className="space-y-3 font-bold text-sm uppercase">
                            <li>
                                <button
                                    onClick={() => navigate('/products')}
                                    className="hover:text-neo-accent cursor-pointer transition-all flex items-center gap-2 hover:translate-x-2 duration-200 text-left font-black"
                                >
                                    <svg className="w-4 h-4 stroke-[4px]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                                    </svg>
                                    Collections
                                </button>
                            </li>
                            <li>
                                <button
                                    onClick={() => navigate('/about')}
                                    className="hover:text-neo-accent cursor-pointer transition-all flex items-center gap-2 hover:translate-x-2 duration-200 text-left font-black"
                                >
                                    <svg className="w-4 h-4 stroke-[4px]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                                    </svg>
                                    About Us
                                </button>
                            </li>
                        </ul>
                    </div>

                    {/* Column 3: Customer Care */}
                    <div>
                        <h4 className="text-base font-black uppercase tracking-widest text-black mb-6 bg-[#C4B5FD] border-4 border-black px-3 py-1 inline-block -rotate-1 neo-shadow-sm">
                            SUPPORT
                        </h4>
                        <ul className="space-y-3 font-bold text-sm uppercase">
                            <li>
                                <button
                                    onClick={() => navigate('/faq')}
                                    className="hover:text-neo-accent cursor-pointer transition-all flex items-center gap-2 hover:translate-x-2 duration-200 text-left font-black"
                                >
                                    <svg className="w-4 h-4 stroke-[4px]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                                    </svg>
                                    FAQ
                                </button>
                            </li>
                            <li>
                                <button
                                    onClick={() => navigate('/returns')}
                                    className="hover:text-neo-accent cursor-pointer transition-all flex items-center gap-2 hover:translate-x-2 duration-200 text-left font-black"
                                >
                                    <svg className="w-4 h-4 stroke-[4px]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                                    </svg>
                                    Returns & Exchanges
                                </button>
                            </li>
                        </ul>
                    </div>

                    {/* Column 4: Legal & Policy */}
                    <div>
                        <h4 className="text-base font-black uppercase tracking-widest text-black mb-6 bg-[#4DEEEA] border-4 border-black px-3 py-1 inline-block rotate-2 neo-shadow-sm">
                            LEGAL
                        </h4>
                        <ul className="space-y-3 font-bold text-sm uppercase">
                            <li>
                                <button
                                    onClick={() => navigate('/privacy')}
                                    className="hover:text-neo-accent cursor-pointer transition-all flex items-center gap-2 hover:translate-x-2 duration-200 text-left font-black"
                                >
                                    <svg className="w-4 h-4 stroke-[4px]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                                    </svg>
                                    Privacy Policy
                                </button>
                            </li>
                            <li>
                                <button
                                    onClick={() => navigate('/terms')}
                                    className="hover:text-neo-accent cursor-pointer transition-all flex items-center gap-2 hover:translate-x-2 duration-200 text-left font-black"
                                >
                                    <svg className="w-4 h-4 stroke-[4px]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                                    </svg>
                                    Terms of Service
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Footer Bottom */}
                <div className="pt-8 border-t-4 border-black flex flex-col sm:flex-row items-center justify-between gap-6">
                    <p className="font-black text-xs sm:text-sm uppercase bg-black text-white px-3 py-1 rotate-1">
                        &copy; {new Date().getFullYear()} NOISE. ALL RIGHTS RESERVED.
                    </p>
                    <div className="flex items-center gap-6 font-bold text-sm uppercase">
                        <button
                            onClick={() => navigate('/privacy')}
                            className="hover:text-neo-accent cursor-pointer transition-colors border-b-2 border-black hover:border-neo-accent pb-0.5 font-black"
                        >
                            Privacy
                        </button>
                        <button
                            onClick={() => navigate('/terms')}
                            className="hover:text-neo-accent cursor-pointer transition-colors border-b-2 border-black hover:border-neo-accent pb-0.5 font-black"
                        >
                            Terms
                        </button>
                    </div>
                </div>
            </div>

            {/* Background decorative text */}
            <div className="absolute -bottom-20 left-0 w-full text-center overflow-hidden pointer-events-none opacity-5 select-none">
                <span className="text-[20vw] font-black uppercase whitespace-nowrap">NOISE.</span>
            </div>
        </footer>
    );
};

export default Footer;
