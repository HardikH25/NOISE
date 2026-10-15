import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { axiosInstance } from '../axiosCalls/axios';

const Checkout = () => {
    const navigate = useNavigate();
    const { cartItems, loading: cartLoading, clearCart } = useCart();
    const { customer } = useAuth();

    // Form state
    const [formData, setFormData] = useState({
        fullName: '',
        phone: '',
        addressLine1: '',
        city: '',
        state: '',
        pincode: ''
    });

    // Error state for field-level validation
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [serverError, setServerError] = useState('');

    // Pre-fill user details if available
    useEffect(() => {
        if (customer) {
            setFormData(prev => ({
                ...prev,
                fullName: customer.fullname || prev.fullName,
                phone: customer.phone ? String(customer.phone) : prev.phone
            }));
        }
    }, [customer]);

    // Calculate total price
    const calculateTotal = () => {
        return cartItems.reduce((acc, item) => {
            const price = item.product?.price || 0;
            return acc + (price * item.quantity);
        }, 0);
    };

    // Real-time input change handler
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));

        // Clear field error on change if it exists
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
        if (serverError) {
            setServerError('');
        }
    };

    // Client-side Validation (Task 3)
    const validateForm = () => {
        const newErrors = {};

        // Full Name validation
        if (!formData.fullName.trim()) {
            newErrors.fullName = 'Full Name is required';
        }

        // Phone validation
        if (!formData.phone.trim()) {
            newErrors.phone = 'Phone Number is required';
        } else if (!/^[0-9]{10}$/.test(formData.phone.trim())) {
            newErrors.phone = 'Phone number must be a valid 10-digit number';
        }

        // Address Line validation
        if (!formData.addressLine1.trim()) {
            newErrors.addressLine1 = 'Address Line is required';
        }

        // City validation
        if (!formData.city.trim()) {
            newErrors.city = 'City is required';
        }

        // State validation
        if (!formData.state.trim()) {
            newErrors.state = 'State is required';
        }

        // Pincode validation
        if (!formData.pincode.trim()) {
            newErrors.pincode = 'Pincode is required';
        } else if (!/^[0-9]{6}$/.test(formData.pincode.trim())) {
            newErrors.pincode = 'Pincode must contain 6 digits';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

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

    // Handle Place Order & Razorpay Checkout
    const handlePlaceOrder = async (e) => {
        if (e) e.preventDefault();

        // 1. Client-side Form Validation
        const isValid = validateForm();
        if (!isValid) {
            return;
        }

        setIsSubmitting(true);
        setServerError('');

        try {
            // 2. Call Backend Create Payment Order API
            const response = await axiosInstance.post('/orders/create-payment-order', {
                shippingAddress: {
                    fullName: formData.fullName.trim(),
                    phone: formData.phone.trim(),
                    addressLine1: formData.addressLine1.trim(),
                    city: formData.city.trim(),
                    state: formData.state.trim(),
                    pincode: formData.pincode.trim()
                }
            });

            const { razorpayOrderId, amount, currency, key, noiceOrderId } = response.data;

            // 3. Load Razorpay Checkout Script
            const isLoaded = await loadRazorpayScript();
            if (!isLoaded) {
                setServerError('Razorpay SDK failed to load. Please check your internet connection.');
                setIsSubmitting(false);
                return;
            }

            // 4. Configure Razorpay Standard Checkout Modal
            const options = {
                key: key,
                amount: amount,
                currency: currency,
                name: 'NOISE',
                description: 'Payment for your NOISE Order',
                order_id: razorpayOrderId,
                handler: async function (paymentResponse) {
                    try {
                        setIsSubmitting(true);
                        // 5. Mandatory Backend Payment Verification
                        const verifyResponse = await axiosInstance.post('/orders/verify-payment', {
                            noiceOrderId: noiceOrderId,
                            razorpay_order_id: paymentResponse.razorpay_order_id,
                            razorpay_payment_id: paymentResponse.razorpay_payment_id,
                            razorpay_signature: paymentResponse.razorpay_signature
                        });

                        if (verifyResponse.data.success) {
                            // 6. Reset global cart state & navigate to success screen
                            clearCart();
                            navigate(`/order-success/${noiceOrderId}`);
                        }
                    } catch (verifyErr) {
                        console.error('Payment verification failed:', verifyErr);
                        setServerError(
                            verifyErr.response?.data?.message ||
                            'Payment verification failed. Please contact support.'
                        );
                    } finally {
                        setIsSubmitting(false);
                    }
                },
                prefill: {
                    name: formData.fullName.trim(),
                    contact: formData.phone.trim()
                },
                theme: {
                    color: '#FFD93D'
                },
                modal: {
                    ondismiss: function () {
                        setIsSubmitting(false);
                    }
                }
            };

            const razorpayInstance = new window.Razorpay(options);

            razorpayInstance.on('payment.failed', function (failResponse) {
                console.error('Payment failed:', failResponse.error);
                setServerError(
                    failResponse.error?.description ||
                    'Payment failed. Your cart has been preserved. Please try again.'
                );
                setIsSubmitting(false);
            });

            razorpayInstance.open();

        } catch (err) {
            console.error('Order creation error:', err);
            setServerError(err.response?.data?.message || 'Unable to create order. Please try again.');
            setIsSubmitting(false);
        }
    };

    if (cartLoading) {
        return (
            <div className="min-h-screen bg-neo-bg flex items-center justify-center p-6">
                <div className="border-4 border-black p-8 bg-white neo-shadow-lg text-2xl font-black uppercase tracking-widest">
                    LOADING CHECKOUT...
                </div>
            </div>
        );
    }

    // Empty Cart Guard
    if (cartItems.length === 0) {
        return (
            <div className="min-h-screen bg-neo-bg flex flex-col items-center justify-center p-6">
                <div className="bg-white border-4 border-black p-8 neo-shadow-lg text-center max-w-lg">
                    <span className="text-6xl mb-4 block">🛒</span>
                    <h1 className="text-3xl font-black uppercase mb-4">Your Cart is Empty</h1>
                    <p className="text-lg font-bold mb-6">
                        You cannot checkout with an empty cart. Add some products first!
                    </p>
                    <button
                        onClick={() => navigate('/products')}
                        className="bg-neo-secondary border-4 border-black px-6 py-3 font-black uppercase text-lg tracking-wider hover:-translate-y-1 hover:neo-shadow-md transition-all active:translate-y-0 active:neo-shadow-sm cursor-pointer"
                    >
                        GO TO PRODUCTS ➔
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-neo-bg font-sans p-4 md:p-8">
            {/* Header */}
            <div className="max-w-6xl mx-auto mb-8">
                <button
                    onClick={() => navigate('/cart')}
                    className="bg-white border-2 border-black px-4 py-2 font-black uppercase text-sm hover:bg-black hover:text-white transition-colors cursor-pointer mb-4 inline-flex items-center gap-2"
                >
                    ← BACK TO CART
                </button>
                <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tight border-b-4 border-black pb-4">
                    CHECKOUT
                </h1>
            </div>

            {/* Server Error Alert */}
            {serverError && (
                <div className="max-w-6xl mx-auto mb-6 bg-[#FF4545] text-white border-4 border-black p-4 neo-shadow-md font-black uppercase tracking-wide flex items-center justify-between">
                    <span>⚠️ {serverError}</span>
                    <button
                        onClick={() => setServerError('')}
                        className="text-white hover:text-black font-black text-xl cursor-pointer ml-4"
                    >
                        ✕
                    </button>
                </div>
            )}

            {/* Two-Column Layout */}
            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Left Column: Shipping Form (Task 2 & 3) */}
                <div className="lg:col-span-7">
                    <div className="bg-white border-4 border-black p-6 md:p-8 neo-shadow-lg">
                        <h2 className="text-2xl font-black uppercase mb-6 border-b-4 border-black pb-3 flex items-center gap-2">
                            <span>📍</span> SHIPPING DETAILS
                        </h2>

                        <form onSubmit={handlePlaceOrder} noValidate className="space-y-5">
                            {/* Full Name */}
                            <div>
                                <label className="block text-sm font-black uppercase tracking-wider mb-2">
                                    Full Name <span className="text-[#FF4545]">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="fullName"
                                    value={formData.fullName}
                                    onChange={handleChange}
                                    placeholder="e.g. Aarav Sharma"
                                    className={`w-full bg-[#FFFDF5] border-3 ${errors.fullName ? 'border-[#FF4545] bg-red-50' : 'border-black'} p-3 font-bold text-base focus:outline-none focus:ring-4 focus:ring-neo-secondary`}
                                />
                                {errors.fullName && (
                                    <p className="mt-1 text-sm font-black text-[#FF4545] flex items-center gap-1">
                                        <span>⚠️</span> {errors.fullName}
                                    </p>
                                )}
                            </div>

                            {/* Phone Number */}
                            <div>
                                <label className="block text-sm font-black uppercase tracking-wider mb-2">
                                    Phone Number (10 Digits) <span className="text-[#FF4545]">*</span>
                                </label>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    maxLength="10"
                                    placeholder="e.g. 9876543210"
                                    className={`w-full bg-[#FFFDF5] border-3 ${errors.phone ? 'border-[#FF4545] bg-red-50' : 'border-black'} p-3 font-bold text-base focus:outline-none focus:ring-4 focus:ring-neo-secondary`}
                                />
                                {errors.phone && (
                                    <p className="mt-1 text-sm font-black text-[#FF4545] flex items-center gap-1">
                                        <span>⚠️</span> {errors.phone}
                                    </p>
                                )}
                            </div>

                            {/* Address Line 1 */}
                            <div>
                                <label className="block text-sm font-black uppercase tracking-wider mb-2">
                                    Street Address <span className="text-[#FF4545]">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="addressLine1"
                                    value={formData.addressLine1}
                                    onChange={handleChange}
                                    placeholder="e.g. Flat 402, 22 MG Road"
                                    className={`w-full bg-[#FFFDF5] border-3 ${errors.addressLine1 ? 'border-[#FF4545] bg-red-50' : 'border-black'} p-3 font-bold text-base focus:outline-none focus:ring-4 focus:ring-neo-secondary`}
                                />
                                {errors.addressLine1 && (
                                    <p className="mt-1 text-sm font-black text-[#FF4545] flex items-center gap-1">
                                        <span>⚠️</span> {errors.addressLine1}
                                    </p>
                                )}
                            </div>

                            {/* City & State Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-black uppercase tracking-wider mb-2">
                                        City <span className="text-[#FF4545]">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="city"
                                        value={formData.city}
                                        onChange={handleChange}
                                        placeholder="e.g. Bengaluru"
                                        className={`w-full bg-[#FFFDF5] border-3 ${errors.city ? 'border-[#FF4545] bg-red-50' : 'border-black'} p-3 font-bold text-base focus:outline-none focus:ring-4 focus:ring-neo-secondary`}
                                    />
                                    {errors.city && (
                                        <p className="mt-1 text-sm font-black text-[#FF4545] flex items-center gap-1">
                                            <span>⚠️</span> {errors.city}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-black uppercase tracking-wider mb-2">
                                        State <span className="text-[#FF4545]">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="state"
                                        value={formData.state}
                                        onChange={handleChange}
                                        placeholder="e.g. Karnataka"
                                        className={`w-full bg-[#FFFDF5] border-3 ${errors.state ? 'border-[#FF4545] bg-red-50' : 'border-black'} p-3 font-bold text-base focus:outline-none focus:ring-4 focus:ring-neo-secondary`}
                                    />
                                    {errors.state && (
                                        <p className="mt-1 text-sm font-black text-[#FF4545] flex items-center gap-1">
                                            <span>⚠️</span> {errors.state}
                                        </p>
                                    )}
                                </div>
                            </div>

                            {/* Pincode */}
                            <div>
                                <label className="block text-sm font-black uppercase tracking-wider mb-2">
                                    Pincode (6 Digits) <span className="text-[#FF4545]">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="pincode"
                                    value={formData.pincode}
                                    onChange={handleChange}
                                    maxLength="6"
                                    placeholder="e.g. 560001"
                                    className={`w-full bg-[#FFFDF5] border-3 ${errors.pincode ? 'border-[#FF4545] bg-red-50' : 'border-black'} p-3 font-bold text-base focus:outline-none focus:ring-4 focus:ring-neo-secondary`}
                                />
                                {errors.pincode && (
                                    <p className="mt-1 text-sm font-black text-[#FF4545] flex items-center gap-1">
                                        <span>⚠️</span> {errors.pincode}
                                    </p>
                                )}
                            </div>
                        </form>
                    </div>
                </div>

                {/* Right Column: Order Summary */}
                <div className="lg:col-span-5">
                    <div className="bg-white border-4 border-black p-6 md:p-8 neo-shadow-lg sticky top-8">
                        <h2 className="text-2xl font-black uppercase mb-6 border-b-4 border-black pb-3 flex items-center gap-2">
                            <span>🧾</span> ORDER SUMMARY
                        </h2>

                        {/* Items list */}
                        <div className="divide-y-2 divide-black mb-6 max-h-80 overflow-y-auto pr-2">
                            {cartItems.map((item) => (
                                <div key={item.product?._id} className="py-3 flex items-center gap-4">
                                    <img
                                        src={item.product?.image}
                                        alt={item.product?.name}
                                        className="w-16 h-16 object-cover border-2 border-black flex-shrink-0 bg-neo-bg"
                                    />
                                    <div className="flex-1 min-w-0">
                                        <h3 className="font-black text-sm uppercase truncate">
                                            {item.product?.name}
                                        </h3>
                                        <p className="text-xs font-bold text-gray-600 mt-1">
                                            Qty: <span className="text-black font-black">{item.quantity}</span> × ₹{item.product?.price}
                                        </p>
                                    </div>
                                    <div className="text-right flex-shrink-0">
                                        <span className="font-black text-base">
                                            ₹{(item.product?.price || 0) * item.quantity}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Breakdown */}
                        <div className="border-t-4 border-black pt-4 space-y-3 mb-6">
                            <div className="flex justify-between font-bold text-base">
                                <span>Subtotal</span>
                                <span>₹{calculateTotal()}</span>
                            </div>
                            <div className="flex justify-between font-bold text-base">
                                <span>Shipping</span>
                                <span className="bg-[#4DEEEA] px-2 py-0.5 border border-black text-xs font-black uppercase">
                                    FREE
                                </span>
                            </div>
                            <div className="flex justify-between items-center border-t-2 border-black pt-3">
                                <span className="text-xl font-black uppercase">Total Amount</span>
                                <span className="text-2xl font-black bg-neo-accent text-white px-3 py-1 border-3 border-black neo-shadow-sm">
                                    ₹{calculateTotal()}
                                </span>
                            </div>
                        </div>

                        {/* Place Order Button */}
                        <button
                            type="button"
                            onClick={handlePlaceOrder}
                            disabled={isSubmitting}
                            className={`w-full py-4 border-4 border-black font-black text-xl uppercase tracking-widest transition-all cursor-pointer flex items-center justify-center gap-2 ${
                                isSubmitting
                                    ? 'bg-gray-300 cursor-not-allowed opacity-75'
                                    : 'bg-neo-secondary hover:-translate-y-1 hover:neo-shadow-lg active:translate-y-0 active:neo-shadow-sm'
                            }`}
                        >
                            {isSubmitting ? (
                                <>
                                    <span className="animate-spin">⏳</span> PROCESSING...
                                </>
                            ) : (
                                <>PLACE ORDER ➔</>
                            )}
                        </button>

                        <p className="text-xs font-bold text-center text-gray-500 uppercase mt-4">
                            🔒 100% Secure Checkout via Razorpay Test Mode
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
