import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';

const FAQ = () => {
    const navigate = useNavigate();
    const [openIndex, setOpenIndex] = useState(0);

    const faqs = [
        {
            q: "HOW DO NOISE DROPS WORK?",
            a: "We release collections in numbered seasonal drops (e.g., DROP 06). Each piece is produced in limited quantities with zero restocks once sold out. Once the drop inventory is exhausted, the design is vaulted into the archive."
        },
        {
            q: "HOW LONG DOES SHIPPING TAKE?",
            a: "All orders are processed and dispatched within 24 to 48 hours from our central warehouse. Standard domestic delivery takes 3 to 5 business days. You will receive real-time order tracking details as soon as the courier scans your package."
        },
        {
            q: "WHAT PAYMENT METHODS DO YOU ACCEPT?",
            a: "We support 100% secure, encrypted digital payments via Razorpay: including UPI (Google Pay, PhonePe, Paytm), Credit & Debit Cards (Visa, Mastercard, RuPay), Net Banking across 50+ major banks, and verified digital wallets."
        },
        {
            q: "WHAT IS YOUR RETURN & EXCHANGE POLICY?",
            a: "All sales are final. Because NOISE releases limited, small-batch seasonal drops with finite inventory, we do not offer returns, refunds, or size exchanges. Please review product details and photos carefully before ordering."
        },
        {
            q: "DO YOU OFFER SIZING SERVICES OR SIZE EXCHANGES?",
            a: "No. We do not offer size exchange services, fit consultations, or replacements. All garments are produced in single, limited batch runs and inventory cannot be swapped once an order is placed."
        },
        {
            q: "ARE ALL PRODUCTS 100% AUTHENTIC?",
            a: "Yes. Every single item sold on NOISE is 100% designed, milled, and inspected under our proprietary production pipeline. We never sell unauthorized replicas or deadstock knockoffs."
        }
    ];

    const toggleFaq = (index) => {
        setOpenIndex(openIndex === index ? -1 : index);
    };

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
                <div className="mb-12 border-b-8 border-black pb-8">
                    <div className="inline-block bg-[#C4B5FD] border-4 border-black px-3 py-1 font-black text-sm uppercase -rotate-2 mb-4">
                        HELP & SUPPORT
                    </div>
                    <h1 className="text-6xl sm:text-7xl font-black uppercase tracking-tighter leading-none mb-4">
                        FREQUENTLY ASKED QUESTIONS.
                    </h1>
                    <p className="font-bold text-lg sm:text-xl uppercase border-l-4 border-black pl-4 bg-white p-3 neo-shadow-sm">
                        Everything you need to know about drops, ordering, and store policies.
                    </p>
                </div>

                {/* FAQ List */}
                <div className="space-y-4 mb-16">
                    {faqs.map((faq, index) => {
                        const isOpen = openIndex === index;
                        return (
                            <div
                                key={index}
                                className="border-4 border-black bg-white neo-shadow-sm transition-all overflow-hidden"
                            >
                                <button
                                    onClick={() => toggleFaq(index)}
                                    className={`w-full p-6 text-left font-black text-lg sm:text-xl uppercase flex items-center justify-between gap-4 transition-colors ${
                                        isOpen ? 'bg-[#FFD93D]' : 'hover:bg-neo-muted'
                                    }`}
                                >
                                    <span className="flex items-center gap-3">
                                        <span className="text-sm bg-black text-white px-2 py-0.5 font-black">
                                            0{index + 1}
                                        </span>
                                        {faq.q}
                                    </span>
                                    <span className="w-8 h-8 border-2 border-black bg-white flex items-center justify-center font-black text-2xl flex-shrink-0">
                                        {isOpen ? '−' : '+'}
                                    </span>
                                </button>

                                {isOpen && (
                                    <div className="p-6 border-t-4 border-black bg-white text-base sm:text-lg font-bold uppercase leading-relaxed text-black/80">
                                        {faq.a}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default FAQ;
