import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { axiosInstance } from '../axiosCalls/axios';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

const ProductCard = ({ product }) => {
    const navigate = useNavigate();
    const { customer, setCustomer } = useAuth();
    const { cartItems, addToCart } = useCart();

    // Wishlist states
    const [wishlistStatus, setWishlistStatus] = useState('default'); // 'default', 'loading', 'success', 'error'
    const [errorMessage, setErrorMessage] = useState('');

    // Cart states
    const [isAddingToCart, setIsAddingToCart] = useState(false);

    const isInWishlist = customer?.wishlist?.some(id => id.toString() === product?._id?.toString()) || false;

    // Find if the product is already in the cart and get its quantity
    const cartItem = cartItems.find(item => item.product._id === product._id);
    const quantityInCart = cartItem ? cartItem.quantity : 0;

    const handleWishlistToggle = async (e) => {
        e.stopPropagation(); // Prevent navigating to product details

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
                    wishlist: [...(customer.wishlist || []), product?._id]
                });
            }
            setWishlistStatus('success');
            setTimeout(() => setWishlistStatus('default'), 3000);
        } catch (error) {
            setWishlistStatus('error');
            setErrorMessage(error.response?.data?.message || 'Unable to update wishlist');
            setTimeout(() => setWishlistStatus('default'), 3000);
        }
    };

    const handleAddToCart = async (e) => {
        e.stopPropagation();

        if (!customer) {
            alert('Please login to add to cart');
            navigate('/login');
            return;
        }

        setIsAddingToCart(true);
        const result = await addToCart(product._id);
        if (!result.success) {
            alert(result.message);
        }
        setIsAddingToCart(false);
    };


    return (
        <div
            onClick={() => navigate(`/products/${product._id}`)}
            className="group border-4 border-black bg-white p-4 neo-shadow-md hover:-translate-y-2 hover:neo-shadow-lg transition-all duration-200 cursor-pointer relative flex flex-col h-full"
        >
            {/* Image Container */}
            <div className="w-full aspect-[4/5] border-4 border-black bg-neo-muted flex items-center justify-center mb-4 overflow-hidden relative">
                <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
                    onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = 'https://images.unsplash.com/photo-1523398002811-999aa8d9512e?q=80&w=600&auto=format&fit=crop';
                    }}
                />

                {/* Out of Stock Overlay */}
                {product.stock === 0 && (
                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center z-10 backdrop-blur-sm">
                        <span className="border-4 border-black bg-[#FF4545] text-black px-4 py-2 font-black uppercase tracking-widest -rotate-12 neo-shadow-sm">
                            SOLD OUT
                        </span>
                    </div>
                )}
            </div>

            {/* Product Info */}
            <div className="flex-grow flex flex-col justify-between">
                <div>
                    <div className="flex justify-between items-start mb-2 gap-2">
                        <h3 className="text-xl font-black text-black uppercase leading-tight line-clamp-2">
                            {product.name}
                        </h3>
                        <span className="font-black text-lg bg-neo-secondary px-2 border-2 border-black whitespace-nowrap">
                            ₹{product.price}
                        </span>
                    </div>
                    <p className="font-bold text-xs uppercase tracking-widest text-black/60 mb-4">
                        {product.category}
                    </p>
                </div>

                {/* Bottom Action Area */}
                <div className="mt-auto border-t-4 border-black pt-4 flex flex-col gap-3">
                    {/* Wishlist Button */}
                    <button
                        onClick={handleWishlistToggle}
                        disabled={wishlistStatus === 'loading' || wishlistStatus === 'success'}
                        className={`w-full py-2 border-2 border-black font-black text-sm uppercase transition-all ${wishlistStatus === 'success' ? 'bg-[#C4B5FD] text-black' :
                            wishlistStatus === 'error' ? 'bg-[#FF4545] text-white' :
                                wishlistStatus === 'loading' ? 'bg-gray-200 text-gray-500' :
                                    isInWishlist ? 'bg-[#FF4545] text-white hover:bg-black hover:text-white' : 'bg-white text-black hover:bg-black hover:text-white'
                            }`}
                    >
                        {wishlistStatus === 'default' && (isInWishlist ? '♥ Remove from Wishlist' : '♡ Add to Wishlist')}
                        {wishlistStatus === 'loading' && '⏳ Saving...'}
                        {wishlistStatus === 'success' && (isInWishlist ? '♥ Added' : '♥ Removed')}
                        {wishlistStatus === 'error' && `❌ ${errorMessage}`}
                    </button>


                    {/* Cart Button */}
                    <button
                        onClick={handleAddToCart}
                        disabled={isAddingToCart || product.stock === 0 || (quantityInCart === product.stock)}
                        className={`w-full py-2 border-2 border-black font-black text-sm uppercase transition-all ${isAddingToCart ? 'bg-gray-200 text-gray-500 cursor-not-allowed' :
                            product.stock === 0 ? 'bg-gray-200 text-gray-500 cursor-not-allowed' :
                                quantityInCart > 0 ? 'bg-neo-accent text-black hover:bg-black hover:text-neo-accent' :
                                    'bg-neo-primary text-black hover:bg-black hover:text-neo-primary'
                            }`}
                    >
                        {isAddingToCart ? '⏳ Adding...' :
                            product.stock === 0 ? 'Out of Stock' :
                                quantityInCart == product.stock ? 'Max Stock Reached' :
                                    quantityInCart > 0 ? `🛒 Add Another (${quantityInCart})` :
                                        '🛒 Add to Cart'}
                    </button>

                    <div className="flex justify-between items-center">
                        <span className={`text-xs font-black uppercase px-2 py-1 border-2 border-black ${product.stock <= 5 && product.stock > 0 ? 'bg-[#FF4545] text-white' : 'bg-neo-bg text-black'}`}>
                            {product.stock > 0 ? (product.stock <= 5 ? `ONLY ${product.stock} LEFT!` : 'IN STOCK') : 'OUT OF STOCK'}
                        </span>

                        <button className="flex items-center gap-1 font-black text-sm uppercase hover:text-neo-accent transition-colors">
                            VIEW
                            <svg className="w-4 h-4 stroke-[4px]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
