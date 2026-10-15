import React from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';

const Privacy = () => {
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
                    <div className="inline-block bg-[#4DEEEA] border-4 border-black px-3 py-1 font-black text-sm uppercase -rotate-1 mb-4">
                        LEGAL COMPLIANCE
                    </div>
                    <h1 className="text-6xl sm:text-7xl font-black uppercase tracking-tighter leading-none mb-4">
                        PRIVACY POLICY.
                    </h1>
                    <p className="font-bold text-lg sm:text-xl uppercase border-l-4 border-black pl-4 bg-white p-3 neo-shadow-sm">
                        WE VALUE YOUR PRIVACY. WE NEVER SELL, RENT, OR MONETIZE YOUR PERSONAL DATA. PERIOD.
                    </p>
                </div>

                {/* Policy Content */}
                <div className="space-y-8 mb-16">
                    <div className="border-4 border-black bg-white p-8 neo-shadow-sm">
                        <h2 className="text-2xl sm:text-3xl font-black uppercase mb-4 flex items-center gap-3">
                            <span className="w-3 h-3 bg-black"></span>
                            1. INFORMATION WE COLLECT
                        </h2>
                        <p className="font-bold text-base uppercase leading-relaxed text-black/80 mb-4">
                            When you register an account or place an order on NOISE, we collect only the necessary credentials required to fulfill and deliver your orders:
                        </p>
                        <ul className="list-disc list-inside space-y-2 font-bold text-sm uppercase text-black/70 pl-2">
                            <li>Account Details: Full Name, verified Email Address, and Phone Number.</li>
                            <li>Delivery Data: Shipping street address, city, state, and 6-digit postal pincode.</li>
                            <li>Order Snapshot: Selected apparel items, sizes, quantities, and transaction timestamps.</li>
                        </ul>
                    </div>

                    <div className="border-4 border-black bg-white p-8 neo-shadow-sm">
                        <h2 className="text-2xl sm:text-3xl font-black uppercase mb-4 flex items-center gap-3">
                            <span className="w-3 h-3 bg-[#FF6B6B]"></span>
                            2. 100% SECURE PAYMENT PROCESSING
                        </h2>
                        <p className="font-bold text-base uppercase leading-relaxed text-black/80 mb-4">
                            NOISE does not store, process, or transmit your credit/debit card numbers or UPI MPINs on our application servers.
                        </p>
                        <p className="font-bold text-base uppercase leading-relaxed text-black/80">
                            All checkout transactions are handled through Razorpay’s Tier-1 PCI-DSS compliant encrypted gateway utilizing end-to-end 256-bit SSL encryption.
                        </p>
                    </div>

                    <div className="border-4 border-black bg-white p-8 neo-shadow-sm">
                        <h2 className="text-2xl sm:text-3xl font-black uppercase mb-4 flex items-center gap-3">
                            <span className="w-3 h-3 bg-[#4ADE80]"></span>
                            3. COOKIES & SESSIONS
                        </h2>
                        <p className="font-bold text-base uppercase leading-relaxed text-black/80 mb-4">
                            We use strict HTTP-only authentication cookies to securely identify your customer session and maintain your active cart across page reloads. We do not use third-party tracking pixels to stalk you across other websites.
                        </p>
                    </div>

                    <div className="border-4 border-black bg-white p-8 neo-shadow-sm">
                        <h2 className="text-2xl sm:text-3xl font-black uppercase mb-4 flex items-center gap-3">
                            <span className="w-3 h-3 bg-[#C4B5FD]"></span>
                            4. YOUR PRIVACY RIGHTS
                        </h2>
                        <p className="font-bold text-base uppercase leading-relaxed text-black/80">
                            You possess full authority to review, update, or permanently delete your customer account and order records at any time. To request complete account erasure, contact our data privacy officer at <span className="underline">privacy@noiseclothing.com</span>.
                        </p>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default Privacy;
