import React from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';

const Returns = () => {
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
                    <div className="inline-block bg-[#FF6B6B] text-white border-4 border-black px-3 py-1 font-black text-sm uppercase -rotate-1 mb-4 neo-shadow-sm">
                        FINAL SALE POLICY
                    </div>
                    <h1 className="text-6xl sm:text-7xl font-black uppercase tracking-tighter leading-none mb-4">
                        RETURNS & EXCHANGES.
                    </h1>
                    <p className="font-bold text-xl uppercase border-l-8 border-black pl-4 bg-white p-4 neo-shadow-sm">
                        ALL SALES ARE FINAL. DUE TO THE STRICTLY LIMITED NATURE OF OUR SMALL-BATCH DROPS, NOISE DOES NOT OFFER RETURNS, REFUNDS, OR SIZE EXCHANGES.
                    </p>
                </div>

                {/* 3 Pillars of Why No Returns */}
                <div className="mb-16">
                    <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight mb-8">
                        WHY WE OPERATE ON FINAL SALE
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="border-4 border-black bg-white p-6 neo-shadow-sm">
                            <div className="w-12 h-12 bg-[#FFD93D] border-4 border-black flex items-center justify-center font-black text-2xl mb-4">
                                1
                            </div>
                            <h3 className="text-2xl font-black uppercase mb-3">LIMITED CAPSULE RUNS</h3>
                            <p className="font-bold text-sm uppercase leading-relaxed text-black/80">
                                Every collection is produced in small, numbered quantities. Once a drop sells out, it is archived permanently. We do not manufacture excess buffer units for size swaps.
                            </p>
                        </div>

                        <div className="border-4 border-black bg-white p-6 neo-shadow-sm">
                            <div className="w-12 h-12 bg-[#FF6B6B] text-white border-4 border-black flex items-center justify-center font-black text-2xl mb-4">
                                2
                            </div>
                            <h3 className="text-2xl font-black uppercase mb-3">NO SIZE SERVICES</h3>
                            <p className="font-bold text-sm uppercase leading-relaxed text-black/80">
                                We do not offer post-purchase sizing services or size exchanges. We urge you to review the item descriptions and specifications thoroughly prior to checkout.
                            </p>
                        </div>

                        <div className="border-4 border-black bg-white p-6 neo-shadow-sm">
                            <div className="w-12 h-12 bg-[#C4B5FD] border-4 border-black flex items-center justify-center font-black text-2xl mb-4">
                                3
                            </div>
                            <h3 className="text-2xl font-black uppercase mb-3">ZERO SECOND-HAND CYCLE</h3>
                            <p className="font-bold text-sm uppercase leading-relaxed text-black/80">
                                Every customer receives a 100% untouched, brand-new piece directly from our warehouse. We never recirculate returned or tried-on garments.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Damaged or Defective Items */}
                <div className="border-4 border-black bg-white p-8 neo-shadow-md mb-16">
                    <h2 className="text-3xl font-black uppercase mb-6 flex items-center gap-3">
                        <span className="w-4 h-4 bg-[#FF6B6B] border-2 border-black"></span>
                        TRANSIT DAMAGE & DEFECTS
                    </h2>

                    <div className="space-y-4 font-bold uppercase text-sm sm:text-base">
                        <p className="text-black/80 leading-relaxed">
                            While all sales are final, we stand by the craftsmanship of our garments. If your package arrives damaged from courier mishandling, or if an item has a manufacturing defect:
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-4">
                            <div className="border-l-4 border-black pl-4 py-2 bg-neo-bg">
                                <h4 className="font-black text-lg mb-1">48-HOUR NOTICE</h4>
                                <p className="text-black/70">Email our support team within 48 hours of delivery confirmation.</p>
                            </div>
                            <div className="border-l-4 border-black pl-4 py-2 bg-neo-bg">
                                <h4 className="font-black text-lg mb-1">UNBOXING PHOTOS</h4>
                                <p className="text-black/70">Include your Order ID and clear photos of the shipping box and product defect.</p>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

            <Footer />
        </div>
    );
};

export default Returns;
