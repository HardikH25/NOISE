import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { axiosInstance } from '../axiosCalls/axios';
import { useCart } from '../context/CartContext';

const OrderSuccess = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { clearCart } = useCart();

    const [order, setOrder] = useState(null);
    const [razorpayKey, setRazorpayKey] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [isRetrying, setIsRetrying] = useState(false);
    const [retryError, setRetryError] = useState('');

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const response = await axiosInstance.get(`/orders/${id}`);
                setOrder(response.data.order);
                if (response.data.key) {
                    setRazorpayKey(response.data.key);
                }
            } catch (err) {
                console.error('Error fetching order details:', err);
                setError(err.response?.data?.message || 'Could not fetch order details');
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchOrder();
        }
    }, [id]);

    // Helper to dynamically load Razorpay Checkout script
    const loadRazorpayScript = () => {
        return new Promise((resolve) => {
            if (window.Razorpay) {
                return resolve(true);
            }
            const existingScript = document.getElementById('razorpay-checkout-script');
            if (existingScript) {
                return resolve(true);
            }
            const script = document.createElement('script');
            script.id = 'razorpay-checkout-script';
            script.src = 'https://checkout.razorpay.com/v1/checkout.js';
            script.onload = () => resolve(true);
            script.onerror = () => resolve(false);
            document.body.appendChild(script);
        });
    };

    // Retry / Complete Payment for Pending Order
    const handleCompletePayment = async () => {
        setIsRetrying(true);
        setRetryError('');

        try {
            const isLoaded = await loadRazorpayScript();
            if (!isLoaded) {
                setRetryError('Razorpay SDK failed to load. Check your connection.');
                setIsRetrying(false);
                return;
            }

            const options = {
                key: razorpayKey,
                amount: Math.round(order.totalAmount * 100),
                currency: 'INR',
                name: 'NOISE',
                description: `Payment for Order #${order._id}`,
                order_id: order.razorpayOrderId,
                handler: async function (paymentResponse) {
                    try {
                        setIsRetrying(true);
                        const verifyRes = await axiosInstance.post('/orders/verify-payment', {
                            noiceOrderId: order._id,
                            razorpay_order_id: paymentResponse.razorpay_order_id,
                            razorpay_payment_id: paymentResponse.razorpay_payment_id,
                            razorpay_signature: paymentResponse.razorpay_signature
                        });

                        if (verifyRes.data.success) {
                            clearCart();
                            setOrder(verifyRes.data.order);
                        }
                    } catch (verifyErr) {
                        console.error('Payment verification failed:', verifyErr);
                        setRetryError(
                            verifyErr.response?.data?.message ||
                            'Payment verification failed. Please try again.'
                        );
                    } finally {
                        setIsRetrying(false);
                    }
                },
                prefill: {
                    name: order.shippingAddress?.fullName || '',
                    contact: String(order.shippingAddress?.phone || '')
                },
                theme: {
                    color: '#FFD93D'
                },
                modal: {
                    ondismiss: function () {
                        setIsRetrying(false);
                    }
                }
            };

            const razorpayInstance = new window.Razorpay(options);

            razorpayInstance.on('payment.failed', function (failResponse) {
                console.error('Payment failed:', failResponse.error);
                setRetryError(
                    failResponse.error?.description ||
                    'Payment failed. Please try again.'
                );
                setIsRetrying(false);
            });

            razorpayInstance.open();
        } catch (err) {
            console.error('Retry error:', err);
            setRetryError(err.message || 'Unable to open payment modal');
            setIsRetrying(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-neo-bg flex items-center justify-center p-6">
                <div className="border-4 border-black p-8 bg-white neo-shadow-lg text-2xl font-black uppercase tracking-widest">
                    FETCHING ORDER DETAILS...
                </div>
            </div>
        );
    }

    if (error || !order) {
        return (
            <div className="min-h-screen bg-neo-bg flex items-center justify-center p-6">
                <div className="bg-white border-4 border-black p-8 neo-shadow-lg text-center max-w-md">
                    <span className="text-6xl mb-4 block">⚠️</span>
                    <h1 className="text-2xl font-black uppercase mb-4">Order Not Found</h1>
                    <p className="font-bold text-gray-700 mb-6">{error || 'Unable to retrieve this order.'}</p>
                    <button
                        onClick={() => navigate('/products')}
                        className="bg-neo-secondary border-3 border-black px-6 py-3 font-black uppercase tracking-wider hover:-translate-y-1 hover:neo-shadow-md transition-all cursor-pointer"
                    >
                        CONTINUE SHOPPING ➔
                    </button>
                </div>
            </div>
        );
    }

    const isPaid = order.paymentStatus === 'PAID';
    const isFailed = order.paymentStatus === 'FAILED';
    const isPending = order.paymentStatus === 'PENDING';

    return (
        <div className="min-h-screen bg-neo-bg font-sans p-4 md:p-8 flex items-center justify-center">
            <div className="max-w-2xl w-full bg-white border-4 border-black p-6 md:p-10 neo-shadow-lg text-center">
                {/* Status Icon Badge */}
                <div
                    className={`inline-flex items-center justify-center w-20 h-20 border-4 border-black rounded-none neo-shadow-sm mb-6 text-4xl ${
                        isPaid
                            ? 'bg-[#4DEEEA]'
                            : isFailed
                            ? 'bg-[#FF4545] text-white'
                            : 'bg-neo-secondary'
                    }`}
                >
                    {isPaid ? '✓' : isFailed ? '✕' : '⏳'}
                </div>

                <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tight mb-2">
                    {isPaid
                        ? 'ORDER PLACED!'
                        : isFailed
                        ? 'PAYMENT FAILED'
                        : 'PAYMENT PENDING'}
                </h1>
                <p className="font-bold text-gray-600 uppercase tracking-wider mb-6">
                    {isPaid
                        ? 'Your payment was verified and your order is confirmed.'
                        : isFailed
                        ? 'Payment failed or was rejected. Your cart has been preserved.'
                        : 'Checkout was closed before payment completed. Cart is preserved.'}
                </p>

                {/* Retry Error Alert */}
                {retryError && (
                    <div className="mb-6 bg-[#FF4545] text-white border-4 border-black p-3 font-black text-sm uppercase">
                        ⚠️ {retryError}
                    </div>
                )}

                {/* Order Summary Receipt Box */}
                <div className="bg-[#FFFDF5] border-3 border-black p-6 text-left mb-8 space-y-4">
                    <div className="flex flex-col md:flex-row justify-between border-b-2 border-black pb-3">
                        <span className="text-xs font-black uppercase text-gray-500">Order ID</span>
                        <span className="font-mono font-black text-sm md:text-base break-all">
                            {order._id}
                        </span>
                    </div>

                    <div className="flex justify-between border-b-2 border-black pb-3 items-center">
                        <span className="text-xs font-black uppercase text-gray-500">Order Status</span>
                        <span
                            className={`border-2 border-black px-3 py-0.5 text-xs font-black uppercase tracking-widest ${
                                isPaid
                                    ? 'bg-[#4E9F3D] text-white'
                                    : isFailed
                                    ? 'bg-[#FF4545] text-white'
                                    : 'bg-neo-secondary text-black'
                            }`}
                        >
                            {order.status}
                        </span>
                    </div>

                    <div className="flex justify-between border-b-2 border-black pb-3 items-center">
                        <span className="text-xs font-black uppercase text-gray-500">Payment Status</span>
                        <span
                            className={`border-2 border-black px-3 py-0.5 text-xs font-black uppercase tracking-widest ${
                                isPaid
                                    ? 'bg-[#4DEEEA] text-black'
                                    : isFailed
                                    ? 'bg-[#FF4545] text-white'
                                    : 'bg-neo-secondary text-black'
                            }`}
                        >
                            {order.paymentStatus}
                        </span>
                    </div>

                    <div className="flex justify-between items-center pt-2">
                        <span className="text-base font-black uppercase">
                            {isPaid ? 'Total Paid' : 'Total Amount'}
                        </span>
                        <span className="text-2xl font-black bg-neo-accent text-white px-3 py-1 border-2 border-black">
                            ₹{order.totalAmount}
                        </span>
                    </div>
                </div>

                {/* Items snapshot breakdown */}
                <div className="text-left mb-8">
                    <h3 className="font-black text-sm uppercase tracking-wider mb-3 border-b-2 border-black pb-1">
                        Purchased Items ({order.items?.length})
                    </h3>
                    <div className="space-y-2">
                        {order.items?.map((item, idx) => (
                            <div key={idx} className="flex justify-between items-center text-sm font-bold">
                                <span className="truncate pr-4">
                                    {item.name} <span className="text-xs font-black text-gray-500">× {item.quantity}</span>
                                </span>
                                <span className="font-black flex-shrink-0">
                                    ₹{item.price * item.quantity}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    {/* If Pending or Failed: Allow user to complete/retry payment right here! */}
                    {!isPaid && (
                        <button
                            onClick={handleCompletePayment}
                            disabled={isRetrying}
                            className="bg-[#4DEEEA] border-3 border-black py-3 px-6 font-black uppercase text-base tracking-wider hover:-translate-y-1 hover:neo-shadow-md transition-all active:translate-y-0 active:neo-shadow-sm cursor-pointer disabled:opacity-50"
                        >
                            {isRetrying ? 'OPENING RAZORPAY...' : `💳 COMPLETE PAYMENT (₹${order.totalAmount}) ➔`}
                        </button>
                    )}

                    <button
                        onClick={() => navigate('/orders')}
                        className="bg-neo-secondary border-3 border-black py-3 px-6 font-black uppercase text-base tracking-wider hover:-translate-y-1 hover:neo-shadow-md transition-all active:translate-y-0 active:neo-shadow-sm cursor-pointer"
                    >
                        VIEW MY ORDERS
                    </button>

                    <button
                        onClick={() => navigate('/cart')}
                        className="bg-white border-3 border-black py-3 px-6 font-black uppercase text-base tracking-wider hover:bg-black hover:text-white transition-colors cursor-pointer"
                    >
                        RETURN TO CART
                    </button>
                </div>
            </div>
        </div>
    );
};

export default OrderSuccess;
