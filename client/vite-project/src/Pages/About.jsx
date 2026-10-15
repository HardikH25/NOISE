import React from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';

const About = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-neo-bg text-neo-ink font-sans selection:bg-neo-accent selection:text-white flex flex-col justify-between">
            <div className="max-w-6xl mx-auto px-6 py-12 md:py-20 flex-grow w-full">
                {/* Back Link */}
                <button
                    onClick={() => navigate(-1)}
                    className="mb-8 flex items-center gap-2 font-black uppercase tracking-widest hover:text-neo-accent transition-colors group"
                >
                    <svg className="w-6 h-6 stroke-[4px] group-hover:-translate-x-2 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    BACK
                </button>

                {/* Hero Header */}
                <div className="mb-14 border-b-8 border-black pb-10">
                    <div className="flex flex-wrap items-center gap-3 mb-4">
                        <span className="bg-neo-secondary border-4 border-black px-3 py-1 font-black text-sm uppercase -rotate-2">
                            EST. 2026
                        </span>
                        <span className="bg-[#4ADE80] border-4 border-black px-3 py-1 font-black text-sm uppercase rotate-2">
                            RAW STREETWEAR
                        </span>
                        <span className="bg-[#FF6B6B] text-white border-4 border-black px-3 py-1 font-black text-sm uppercase -rotate-1">
                            UNFILTERED
                        </span>
                    </div>

                    <h1 className="text-6xl sm:text-8xl font-black uppercase tracking-tighter leading-none mb-6">
                        WE ARE NOISE.
                    </h1>
                    <p className="font-bold text-xl sm:text-2xl uppercase border-l-8 border-black pl-6 bg-white p-4 neo-shadow-sm">
                        BORN TO DISRUPT TIRED FAST-FASHION WITH HIGH-GRADE RAW TEXTILES, RELENTLESS AESTHETICS, AND LIMITED DROPS.
                    </p>
                </div>

                {/* Manifesto Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-20">
                    <div className="border-4 border-black bg-white p-8 neo-shadow-md">
                        <div className="inline-block bg-[#C4B5FD] border-4 border-black px-3 py-1 font-black uppercase mb-6 -rotate-1">
                            OUR MANIFESTO
                        </div>
                        <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight mb-4">
                            LOUD CLOTHES FOR QUIET CONFIDENCE.
                        </h2>
                        <p className="font-bold text-base uppercase leading-relaxed text-black/80 mb-4">
                            Most brands engineer clothing to blend in. NOISE was founded on the opposite premise: what if streetwear was unapologetic, heavy-duty, and treated like high art?
                        </p>
                        <p className="font-bold text-base uppercase leading-relaxed text-black/80">
                            We manufacture in tightly audited small batches. 240+ GSM organic cotton, reinforced double-needle stitching, and custom boxy silhouettes that hold shape across decades, not seasons.
                        </p>
                    </div>

                    <div className="border-4 border-black bg-[#FFD93D] p-8 neo-shadow-md flex flex-col justify-between">
                        <div>
                            <div className="inline-block bg-white border-4 border-black px-3 py-1 font-black uppercase mb-6 rotate-2">
                                THE ARCHITECTURE
                            </div>
                            <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight mb-4 text-black">
                                WHY THE BRUTALIST CODE?
                            </h2>
                            <p className="font-bold text-base uppercase leading-relaxed text-black/90 mb-4">
                                Our entire design philosophy—from our web interface to the packaging tape on your cardboard shipment—honors raw Neo-Brutalism. Bold borders, honest contracts, and zero hidden tricks.
                            </p>
                        </div>
                        <div className="border-4 border-black bg-white p-4 text-center mt-6">
                            <span className="font-black text-xl uppercase tracking-widest text-black">
                                0% BULLSH*T. 100% SUBSTANCE.
                            </span>
                        </div>
                    </div>
                </div>

                {/* The 3 Core Pillars */}
                <div className="mb-20">
                    <h2 className="text-4xl sm:text-5xl font-black uppercase tracking-tight mb-8 border-b-4 border-black pb-4">
                        CORE PILLARS
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="border-4 border-black bg-white p-6 neo-shadow-sm hover:-translate-y-1 transition-transform">
                            <div className="w-12 h-12 bg-[#4ADE80] border-4 border-black flex items-center justify-center font-black text-2xl mb-4">
                                01
                            </div>
                            <h3 className="text-2xl font-black uppercase mb-2">HYPER-LIMITED DROPS</h3>
                            <p className="font-bold text-sm uppercase leading-relaxed text-black/70">
                                When a drop sells out, it’s archived. We refuse to flood landfill sites with overproduction.
                            </p>
                        </div>

                        <div className="border-4 border-black bg-white p-6 neo-shadow-sm hover:-translate-y-1 transition-transform">
                            <div className="w-12 h-12 bg-[#FF6B6B] text-white border-4 border-black flex items-center justify-center font-black text-2xl mb-4">
                                02
                            </div>
                            <h3 className="text-2xl font-black uppercase mb-2">UNRIVALED HEAVYWEIGHT</h3>
                            <p className="font-bold text-sm uppercase leading-relaxed text-black/70">
                                Custom custom-milled French terry and combed jersey. You feel the weight the second you open the package.
                            </p>
                        </div>

                        <div className="border-4 border-black bg-white p-6 neo-shadow-sm hover:-translate-y-1 transition-transform">
                            <div className="w-12 h-12 bg-[#4DEEEA] border-4 border-black flex items-center justify-center font-black text-2xl mb-4">
                                03
                            </div>
                            <h3 className="text-2xl font-black uppercase mb-2">FAIR CRAFT & WAGES</h3>
                            <p className="font-bold text-sm uppercase leading-relaxed text-black/70">
                                Ethical production facilities paying living wages. No compromises on human dignity behind the seams.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Call to Action */}
                <div className="border-4 border-black bg-black p-10 text-center neo-shadow-lg text-white">
                    <h2 className="text-4xl sm:text-5xl font-black uppercase tracking-tight mb-4">
                        READY TO WEAR THE REVOLUTION?
                    </h2>
                    <p className="font-bold text-lg uppercase tracking-wider text-white/80 mb-8 max-w-xl mx-auto">
                        Check out our current drop before pieces hit the archive permanently.
                    </p>
                    <button
                        onClick={() => navigate('/products')}
                        className="border-4 border-white bg-neo-accent text-black font-black uppercase tracking-widest px-8 py-4 text-xl hover:bg-white transition-all neo-shadow-sm"
                    >
                        EXPLORE THE ARCHIVE &rarr;
                    </button>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default About;
