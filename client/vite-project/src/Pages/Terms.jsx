import React from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';

const Terms = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-neo-bg text-neo-ink font-sans selection:bg-neo-accent selection:text-white flex flex-col justify-between">
            <div className="max-w-5xl mx-auto px-6 py-12 md:py-20 flex-grow w-full">
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
                <div className="mb-14 border-b-8 border-black pb-8">
                    <div className="inline-block bg-[#FFD93D] border-4 border-black px-3 py-1 font-black text-sm uppercase rotate-1 mb-4">
                        USER AGREEMENT
                    </div>
                    <h1 className="text-6xl sm:text-7xl font-black uppercase tracking-tighter leading-none mb-4">
                        TERMS OF SERVICE.
                    </h1>
                    <p className="font-bold text-lg sm:text-xl uppercase border-l-4 border-black pl-4 bg-white p-3 neo-shadow-sm">
                        HONEST CONTRACTS. NO FINE-PRINT SURPRISES. READ OUR RULES OF ENGAGEMENT.
                    </p>
                </div>

                {/* Terms Content */}
                <div className="space-y-8 mb-16">
                    <div className="border-4 border-black bg-white p-8 neo-shadow-sm">
                        <h2 className="text-2xl sm:text-3xl font-black uppercase mb-4 flex items-center gap-3">
                            <span className="w-3 h-3 bg-black"></span>
                            1. DROP ACCEPTANCE & PRICING
                        </h2>
                        <p className="font-bold text-base uppercase leading-relaxed text-black/80 mb-4">
                            All drop releases are subject to live stock availability. Placing an item into your digital cart does not reserve the stock until an order is verified and completed via payment.
                        </p>
                        <p className="font-bold text-base uppercase leading-relaxed text-black/80">
                            All prices displayed are listed in Indian Rupees (INR) inclusive of applicable taxes. Shipping rates, if any, are clearly calculated before final payment authorization.
                        </p>
                    </div>

                    <div className="border-4 border-black bg-white p-8 neo-shadow-sm">
                        <h2 className="text-2xl sm:text-3xl font-black uppercase mb-4 flex items-center gap-3">
                            <span className="w-3 h-3 bg-[#FF6B6B]"></span>
                            2. ORDER CONFIRMATION & VERIFICATION
                        </h2>
                        <p className="font-bold text-base uppercase leading-relaxed text-black/80 mb-4">
                            Orders are deemed confirmed only once Razorpay cryptographic HMAC-SHA256 signature verification successfully passes and a valid order receipt is generated in our database.
                        </p>
                        <p className="font-bold text-base uppercase leading-relaxed text-black/80">
                            In the event of network disconnection or pending payment authorization, users can complete payment anytime directly from the Orders dashboard.
                        </p>
                    </div>

                    <div className="border-4 border-black bg-white p-8 neo-shadow-sm">
                        <h2 className="text-2xl sm:text-3xl font-black uppercase mb-4 flex items-center gap-3">
                            <span className="w-3 h-3 bg-[#4ADE80]"></span>
                            3. INTELLECTUAL PROPERTY
                        </h2>
                        <p className="font-bold text-base uppercase leading-relaxed text-black/80 mb-4">
                            All logos, bespoke typography, garments, apparel prints, photographs, and editorial collages are the exclusive intellectual property of NOISE. Unauthorized reproduction, commercial distribution, or counterfeit imitation is strictly prohibited and subject to legal enforcement.
                        </p>
                    </div>

                    <div className="border-4 border-black bg-white p-8 neo-shadow-sm">
                        <h2 className="text-2xl sm:text-3xl font-black uppercase mb-4 flex items-center gap-3">
                            <span className="w-3 h-3 bg-[#C4B5FD]"></span>
                            4. PROHIBITED CONDUCT
                        </h2>
                        <p className="font-bold text-base uppercase leading-relaxed text-black/80">
                            Any attempts to manipulate stock counts, deploy automated bot checkout scripts, execute unauthorized API calls, or fabricate fraudulent payment claims will result in immediate permanent account termination and order cancellation.
                        </p>
                    </div>

                    <div className="border-4 border-black bg-white p-8 neo-shadow-sm">
                        <h2 className="text-2xl sm:text-3xl font-black uppercase mb-4 flex items-center gap-3">
                            <span className="w-3 h-3 bg-[#FF6B6B]"></span>
                            5. ALL SALES ARE FINAL
                        </h2>
                        <p className="font-bold text-base uppercase leading-relaxed text-black/80">
                            Because NOISE collections are released in limited capsule drops with finite inventory, all sales are final. We do not provide post-purchase returns, refunds, or size exchange services.
                        </p>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default Terms;
