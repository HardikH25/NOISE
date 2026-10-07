import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { axiosInstance } from '../axiosCalls/axios';
import { useAuth } from '../context/AuthContext';

const ProductDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { customer, setCustomer } = useAuth();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [wishlistStatus, setWishlistStatus] = useState('default'); // 'default', 'loading', 'success', 'error'
    const [wishlistError, setWishlistError] = useState('');
    
    useEffect(() => {
        const fetchProduct = async () => {
            setLoading(true);
            try {
                const response = await axiosInstance.get(`/products/${id}`);
                setProduct(response.data.product);
            } catch (err) {
                setError(err.response?.data?.message || 'Failed to fetch product details.');
            } finally {
                setLoading(false);
            }
        };
        fetchProduct();
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-screen bg-neo-bg flex flex-col items-center justify-center">
                <div className="w-20 h-20 border-8 border-black border-t-neo-accent rounded-full animate-spin mb-6"></div>
                <h2 className="text-4xl font-black uppercase tracking-widest animate-pulse">Scanning Archive...</h2>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-neo-bg flex flex-col items-center justify-center px-6">
                <div className="border-4 border-black bg-[#FF4545] p-12 text-center max-w-2xl neo-shadow-lg -rotate-2">
                    <h2 className="text-6xl font-black uppercase mb-4 text-white">SYSTEM FAILURE</h2>
                    <p className="text-2xl font-bold uppercase text-black mb-8">{error}</p>
                    <button onClick={() => navigate('/products')} className="border-4 border-black bg-white px-8 py-4 font-black uppercase text-xl hover:bg-black hover:text-white transition-colors">
                        RETURN TO CATALOG
                    </button>
                </div>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="min-h-screen bg-neo-bg flex items-center justify-center">
                <h2 className="text-5xl font-black uppercase">Product Not Found.</h2>
            </div>
        );
    }

    const isInWishlist = customer?.wishlist?.some(id => id.toString() === product?._id?.toString()) || false;

    const handleWishlistToggle = async () => {
        if (!customer) {
            alert('Please login to modify wishlist');
            navigate('/login');
            return;
        }

        setWishlistStatus('loading');
        try {
            if (isInWishlist) {
                // Remove from wishlist
                await axiosInstance.delete(`/wishlist/${product?._id}`);
                setCustomer({
                    ...customer,
                    wishlist: (customer.wishlist || []).filter(id => id.toString() !== product?._id?.toString())
                });
            } else {
                // Add to wishlist
                await axiosInstance.post(`/wishlist/${product?._id}`);
                setCustomer({
                    ...customer,
                    wishlist: [...(customer.wishlist || []), product._id]
                });
            }
            setWishlistStatus('success');
            setTimeout(() => setWishlistStatus('default'), 3000);
        } catch (error) {
            console.log(error);
            setWishlistStatus('error');
            setWishlistError(error.response?.data?.message || 'Unable to update wishlist');
            setTimeout(() => setWishlistStatus('default'), 3000);
        }
    }
    return (
        <div className="min-h-screen bg-neo-bg text-neo-ink font-sans selection:bg-neo-accent selection:text-white py-12 md:py-24">
            <div className="max-w-6xl mx-auto px-6">
                
                {/* Back Button */}
                <button 
                    onClick={() => navigate('/products')}
                    className="mb-8 flex items-center gap-2 font-black uppercase tracking-widest hover:text-neo-accent transition-colors group"
                >
                    <svg className="w-6 h-6 stroke-[4px] group-hover:-translate-x-2 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    BACK TO DROPS
                </button>

                <div className="flex flex-col md:flex-row gap-12 lg:gap-20">
                    
                    {/* Left: Image */}
                    <div className="flex-1">
                        <div className="w-full aspect-[4/5] md:aspect-[3/4] border-4 border-black bg-neo-muted relative overflow-hidden neo-shadow-lg group">
                            <img
                                src={product.image}
                                alt={product.name}
                                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                                onError={(e) => { 
                                    e.target.onerror = null; 
                                    e.target.src = 'https://images.unsplash.com/photo-1523398002811-999aa8d9512e?q=80&w=600&auto=format&fit=crop'; 
                                }}
                            />
                            
                            {/* Decorative Elements */}
                            <div className="absolute top-6 left-6 border-4 border-black bg-white px-4 py-2 rotate-6 neo-shadow-sm">
                                <span className="font-black text-xl uppercase tracking-widest">AUTHENTIC</span>
                            </div>
                            
                            {product.stock === 0 && (
                                <div className="absolute inset-0 bg-black/60 flex items-center justify-center backdrop-blur-md">
                                    <span className="border-8 border-black bg-[#FF4545] text-black px-8 py-4 text-5xl font-black uppercase -rotate-12 neo-shadow-lg">
                                        SOLD OUT
                                    </span>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Right: Product Info */}
                    <div className="flex-1 flex flex-col justify-center">
                        <div className="mb-4 flex items-center gap-4">
                            <span className="bg-neo-accent text-black font-black uppercase px-3 py-1 border-2 border-black tracking-widest text-sm">
                                {product.category}
                            </span>
                            <span className={`font-black uppercase tracking-widest text-sm px-3 py-1 border-2 border-black ${product.stock <= 5 && product.stock > 0 ? 'bg-[#FF4545] text-white' : 'bg-white text-black'}`}>
                                {product.stock > 0 ? (product.stock <= 5 ? `ONLY ${product.stock} LEFT!` : 'IN STOCK') : 'OUT OF STOCK'}
                            </span>
                        </div>

                        <h1 className="text-5xl lg:text-7xl font-black uppercase tracking-tighter leading-[0.9] mb-6">
                            {product.name}
                        </h1>

                        <div className="text-4xl lg:text-5xl font-black mb-8 flex items-end gap-2">
                            <span>₹{product.price}</span>
                            <span className="text-lg text-black/50 line-through mb-2">₹{Math.floor(product.price * 1.4)}</span>
                        </div>

                        <div className="border-t-4 border-black pt-8 mb-8">
                            <h3 className="text-2xl font-black uppercase mb-4">THE DETAILS</h3>
                            <p className="text-lg font-bold uppercase leading-relaxed text-black/80 bg-white/50 p-4 border-l-4 border-black">
                                {product.description}
                            </p>
                        </div>

                        {/* Actions */}
                        <div className="mt-auto flex flex-col gap-4">
                            <button 
                                disabled={product.stock === 0}
                                className={`relative group w-full cursor-pointer block ${product.stock === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
                            >
                                <div className="absolute inset-0 bg-black translate-x-2 translate-y-2 group-active:translate-x-0 group-active:translate-y-0 transition-transform duration-100" />
                                <div className={`relative border-4 border-black px-8 py-6 flex items-center justify-center gap-3 transition-transform duration-100 group-active:translate-x-2 group-active:translate-y-2 ${product.stock === 0 ? 'bg-neo-muted' : 'bg-neo-secondary'}`}>
                                    <span className="font-black text-2xl uppercase tracking-wider text-black">
                                        {product.stock === 0 ? 'UNAVAILABLE' : 'ADD TO CART'}
                                    </span>
                                    {product.stock > 0 && (
                                        <svg className="w-8 h-8 stroke-[3px] text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                        </svg>
                                    )}
                                </div>
                            </button>

                            <button 
                                onClick={handleWishlistToggle}
                                disabled={wishlistStatus === 'loading' || wishlistStatus === 'success'}
                                className={`relative group w-full cursor-pointer block mt-2`}
                            >
                                <div className="absolute inset-0 bg-black translate-x-1.5 translate-y-1.5 group-active:translate-x-0 group-active:translate-y-0 transition-transform duration-100" />
                                <div className={`relative border-4 border-black px-8 py-4 flex items-center justify-center gap-3 transition-transform duration-100 group-active:translate-x-1.5 group-active:translate-y-1.5 ${
                                    wishlistStatus === 'success' ? 'bg-[#C4B5FD]' :
                                    wishlistStatus === 'error' ? 'bg-[#FF4545]' :
                                    wishlistStatus === 'loading' ? 'bg-gray-200' :
                                    isInWishlist ? 'bg-[#FF4545]' : 'bg-white'
                                }`}>
                                    <span className={`font-black text-xl uppercase tracking-wider ${
                                        wishlistStatus === 'error' || isInWishlist ? 'text-white' : 'text-black'
                                    }`}>
                                        {wishlistStatus === 'default' && (isInWishlist ? '♥ REMOVE FROM WISHLIST' : '♡ ADD TO WISHLIST')}
                                        {wishlistStatus === 'loading' && '⏳ SAVING...'}
                                        {wishlistStatus === 'success' && (isInWishlist ?  '♥ ADDED TO WISHLIST' : '♥ REMOVED FROM WISHLIST')}
                                        {wishlistStatus === 'error' && `❌ ${wishlistError}`}
                                    </span>
                                </div>
                            </button>
                            <p className="text-center font-bold text-xs uppercase tracking-widest mt-6 text-black/60">
                                FREE SHIPPING ON ORDERS OVER ₹5000. DO NOT RETURN IF TAGS ARE REMOVED.
                            </p>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
