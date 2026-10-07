import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { axiosInstance } from '../axiosCalls/axios';
import ProductCard from '../components/ProductCard';
import { useAuth } from '../context/AuthContext';

const Wishlist = () => {
    const navigate = useNavigate();
    const { customer } = useAuth();
    const [wishlistProducts, setWishlistProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    //keep the displayed products perfectly synced with the AuthContext state
    //so if they click "Remove" on a card, it instantly vanishes
    const filteredWishlist = wishlistProducts.filter((product) => 
        customer?.wishlist?.some((id) => id.toString() === product._id.toString())
    );

    const fetchWishlist = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axiosInstance.get('/wishlist');
            setWishlistProducts(response.data.wishlist || []);
        } catch (err) {
            setError(err.response?.data?.message || 'Unable to load wishlist.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchWishlist();
    }, []);

    return (
        <div className="min-h-screen bg-neo-bg text-neo-ink font-sans selection:bg-neo-accent selection:text-white pt-10 pb-24">
            <div className="max-w-7xl mx-auto px-6">

                {/* Header Section */}
                <div className="mb-12 border-b-4 border-black pb-8 flex items-center justify-between">
                    <div>
                        <h1 className="text-5xl sm:text-7xl font-black tracking-tighter uppercase mb-6 flex items-center gap-4">
                            YOUR VAULT.
                            {!loading && !error && (
                                <span className="text-3xl bg-[#C4B5FD] px-4 py-2 border-4 border-black rotate-3">
                                    {filteredWishlist.length}
                                </span>
                            )}
                        </h1>
                        <p className="font-bold text-lg max-w-2xl uppercase border-l-4 border-black pl-4 bg-white/50 py-2">
                            Saved drops. Don't wait too long.
                        </p>
                    </div>
                    <button
                        onClick={() => navigate('/products')}
                        className="hidden md:flex border-4 border-black bg-white px-8 py-4 font-black uppercase text-xl hover:bg-black hover:text-white transition-colors"
                    >
                        BACK TO DROPS
                    </button>
                </div>

                {/* Loading State */}
                {loading && (
                    <div className="flex flex-col items-center justify-center py-24">
                        <div className="w-16 h-16 border-8 border-black border-t-neo-accent rounded-full animate-spin mb-6"></div>
                        <h2 className="text-3xl font-black uppercase tracking-widest animate-pulse">Loading Vault...</h2>
                    </div>
                )}

                {/* Error State */}
                {!loading && error && (
                    <div className="border-4 border-black bg-[#FF4545] p-8 neo-shadow-md transform -rotate-1 my-12 text-center">
                        <h2 className="text-4xl font-black uppercase mb-2 text-white">FATAL ERROR</h2>
                        <p className="text-xl font-bold uppercase text-black">{error}</p>
                        <button onClick={fetchWishlist} className="mt-6 border-4 border-black bg-white px-6 py-2 font-black uppercase tracking-widest hover:bg-black hover:text-white transition-colors">
                            RETRY CONNECTION
                        </button>
                    </div>
                )}

                {/* Empty State */}
                {!loading && !error && filteredWishlist.length === 0 && (
                    <div className="border-4 border-black bg-[#C4B5FD] p-12 text-center py-24 my-12 neo-shadow-sm flex flex-col items-center">
                        <span className="text-6xl mb-6 block">💔</span>
                        <h2 className="text-5xl font-black uppercase mb-4">EMPTY VAULT.</h2>
                        <p className="text-xl font-bold uppercase mb-8 max-w-lg">
                            Your wishlist is looking dry. Start saving drops before they sell out.
                        </p>
                        <button
                            onClick={() => navigate('/products')}
                            className="border-4 border-black bg-white px-8 py-3 font-black uppercase text-xl hover:bg-black hover:text-white transition-colors"
                        >
                            BROWSE DROPS
                        </button>
                    </div>
                )}

                {/* Product Grid */}
                {!loading && !error && filteredWishlist.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {filteredWishlist.map(product => (
                            <ProductCard key={product._id} product={product} />
                        ))}
                    </div>
                )}

            </div>
        </div>
    );
};

export default Wishlist;
