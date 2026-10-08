import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Cart = () => {
    const navigate = useNavigate();
    const { cartItems, loading, error, updateQuantity, removeFromCart } = useCart();

    const calculateTotal = () => {
        return cartItems.reduce((total, item) => {
            return total + (item.product.price * item.quantity);
        }, 0);
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-neo-bg font-sans flex flex-col">
                <div className="flex-grow flex justify-center items-center">
                    <div className="border-4 border-black p-8 bg-white neo-shadow-lg text-2xl font-black uppercase tracking-widest">
                        LOADING CART...
                    </div>
                </div>
            </div>
        );
    }
    const handleDecreaseQuantity = (productId, quantity) => {
        if(quantity === 1){
            removeFromCart(productId)
        }
        else{
            updateQuantity(productId, quantity - 1)
        }
    }

    return (
        <div className="min-h-screen bg-neo-bg text-neo-ink font-sans selection:bg-neo-accent selection:text-white flex flex-col">

            <main className="flex-grow max-w-7xl mx-auto w-full px-4 py-8 md:py-12 flex flex-col md:flex-row gap-8">
                {/* Left Side: Cart Items */}
                <div className="w-full md:w-2/3">
                    <div className="flex justify-between items-end mb-8 border-b-4 border-black pb-4">
                        <h1 className="text-4xl md:text-5xl font-black tracking-tighter uppercase">
                            Your Cart
                        </h1>
                        <span className="text-xl font-bold bg-neo-accent px-3 py-1 border-4 border-black">
                            {cartItems.length} Items
                        </span>
                    </div>

                    {error && (
                        <div className="bg-[#FF4545] text-white border-4 border-black p-4 mb-6 font-bold uppercase tracking-wide neo-shadow-sm flex items-center justify-between">
                            <span>❌ {error}</span>
                        </div>
                    )}

                    {cartItems.length === 0 ? (
                        <div className="bg-white border-4 border-black p-12 text-center neo-shadow-md">
                            <h2 className="text-3xl font-black uppercase mb-4">Your cart is empty!</h2>
                            <p className="text-lg mb-8 font-bold text-gray-600">Looks like you haven't added anything yet.</p>
                            <button
                                onClick={() => navigate('/products')}
                                className="bg-neo-primary border-4 border-black px-8 py-3 font-black text-xl hover:-translate-y-1 hover:neo-shadow-lg transition-all"
                            >
                                START SHOPPING
                            </button>
                        </div>
                    ) : (
                        <div className="flex flex-col gap-6">
                            {cartItems.map((item) => (
                                <div key={item.product._id} className="bg-white border-4 border-black p-4 neo-shadow-md flex flex-col sm:flex-row gap-4 items-center sm:items-stretch">

                                    {/* Product Image */}
                                    <div className="w-32 h-32 border-4 border-black shrink-0 cursor-pointer" onClick={() => navigate(`/products/${item.product._id}`)}>
                                        <img
                                            src={item.product.image}
                                            alt={item.product.name}
                                            className="w-full h-full object-cover"
                                            onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1523398002811-999aa8d9512e?q=80&w=600'; }}
                                        />
                                    </div>

                                    {/* Product Details */}
                                    <div className="flex-grow flex flex-col justify-between py-2 w-full">
                                        <div>
                                            <div className="flex justify-between items-start gap-4">
                                                <h3
                                                    className="text-xl font-black uppercase line-clamp-2 cursor-pointer hover:underline"
                                                    onClick={() => navigate(`/products/${item.product._id}`)}
                                                >
                                                    {item.product.name}
                                                </h3>
                                                <span className="font-black text-xl bg-neo-secondary px-2 border-2 border-black whitespace-nowrap">
                                                    ₹{item.product.price}
                                                </span>
                                            </div>
                                            <p className="font-bold text-sm uppercase tracking-widest text-black/60 mt-1">
                                                {item.product.category}
                                            </p>
                                        </div>

                                        {/* Actions */}
                                        <div className="flex justify-between items-center mt-4 border-t-2 border-black pt-4">
                                            {/* Quantity Controls */}
                                            <div className="flex items-center gap-4 border-2 border-black p-1 bg-neo-bg">
                                                <button
                                                    onClick={() => handleDecreaseQuantity(item.product._id, item.quantity)}
                                                    className="w-8 h-8 flex items-center justify-center bg-white border-2 border-black font-black text-xl hover:bg-neo-accent hover:text-white transition-colors disabled:opacity-50 disabled:hover:bg-white disabled:hover:text-black cursor-pointer disabled:cursor-not-allowed"
                                                >
                                                    -
                                                </button>
                                                <span className="font-black text-lg w-6 text-center">
                                                    {item.quantity}
                                                </span>
                                                <button
                                                    onClick={() => updateQuantity(item.product._id, item.quantity + 1)}
                                                    disabled={item.quantity == item.product.stock}
                                                    className="w-8 h-8 flex items-center justify-center bg-white border-2 border-black font-black text-xl hover:bg-neo-accent hover:text-white transition-colors disabled:opacity-50 disabled:hover:bg-white disabled:hover:text-black cursor-pointer disabled:cursor-not-allowed"
                                                >
                                                    +
                                                </button>
                                            </div>

                                            {/* Delete Button */}
                                            <button
                                                onClick={() => removeFromCart(item.product._id)}
                                                className="bg-[#FF4545] text-white border-2 border-black px-4 py-2 font-black uppercase text-sm hover:bg-black transition-colors flex items-center gap-2"
                                            >
                                                <span>🗑️ Remove</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Right Side: Order Summary */}
                {cartItems.length > 0 && (
                    <div className="w-full md:w-1/3">
                        <div className="bg-white border-4 border-black p-6 neo-shadow-lg sticky top-8">
                            <h2 className="text-2xl font-black uppercase mb-6 border-b-4 border-black pb-4">
                                Order Summary
                            </h2>

                            <div className="flex flex-col gap-4 mb-6">
                                <div className="flex justify-between font-bold text-lg">
                                    <span>Subtotal</span>
                                    <span>₹{calculateTotal()}</span>
                                </div>
                                <div className="flex justify-between font-bold text-lg">
                                    <span>Shipping</span>
                                    <span className="text-neo-primary">FREE</span>
                                </div>
                            </div>

                            <div className="flex justify-between items-center border-t-4 border-black pt-4 mb-8">
                                <span className="text-xl font-black uppercase">Total</span>
                                <span className="text-3xl font-black bg-neo-accent text-white px-2 border-4 border-black">
                                    ₹{calculateTotal()}
                                </span>
                            </div>

                            <button className="w-full bg-neo-primary border-4 border-black py-4 font-black text-xl uppercase tracking-widest hover:-translate-y-1 hover:neo-shadow-lg transition-all active:translate-y-0 active:neo-shadow-sm">
                                CHECKOUT NOW
                            </button>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
};

export default Cart;
