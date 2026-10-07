import React, { useState, useEffect } from 'react';
import { axiosInstance } from '../axiosCalls/axios';
import ProductCard from '../components/ProductCard';

const Products = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Filters
    const [searchTerm, setSearchTerm] = useState('');
    const [category, setCategory] = useState('');

    const fetchProducts = async () => {
        setLoading(true);
        setError(null);
        try {
            const params = new URLSearchParams();
            if (searchTerm) params.append('search', searchTerm);
            if (category) params.append('category', category);

            const response = await axiosInstance.get(`/products?${params.toString()}`);//after question mark -> url doesnt change the route path -? ? packages the query neatly into an obj ->req.query
            setProducts(response.data.products);
        } catch (err) {
            setError(err.response?.data?.message || 'Something went wrong while loading products.');
        } finally {
            setLoading(false);
        }
    };
    // Debounced effect for search and category changes
    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            fetchProducts();
        }, 300);

        return () => clearTimeout(delayDebounceFn);
    }, [searchTerm, category]);

    const categories = ['Cargos', 'Hoodies', 'Graphic Tees', 'Sneakers'];

    return (
        <div className="min-h-screen bg-neo-bg text-neo-ink font-sans selection:bg-neo-accent selection:text-white pt-10 pb-24">
            <div className="max-w-7xl mx-auto px-6">

                {/* Header Section */}
                <div className="mb-12 border-b-4 border-black pb-8">
                    <h1 className="text-5xl sm:text-7xl font-black tracking-tighter uppercase mb-6">
                        THE ARCHIVE.
                    </h1>
                    <p className="font-bold text-lg max-w-2xl uppercase border-l-4 border-black pl-4 bg-white/50 py-2">
                        Browse the complete collection. Raw streetwear, unfiltered designs.
                    </p>
                </div>

                {/* Filters Section */}
                <div className="flex flex-col md:flex-row gap-6 mb-12 bg-white border-4 border-black p-6 neo-shadow-sm">
                    {/* Search Bar */}
                    <div className="flex-1">
                        <label className="block font-black text-sm uppercase tracking-widest mb-2">Search Drops</label>
                        <div className="relative">
                            <input
                                type="text"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                placeholder="SEARCH..."
                                className="w-full border-4 border-black p-4 font-bold uppercase focus:outline-none focus:bg-neo-secondary transition-colors placeholder:text-black/40"
                            />
                            <svg className="absolute right-4 top-1/2 -translate-y-1/2 w-6 h-6 stroke-[3px]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                            </svg>
                        </div>
                    </div>

                    {/* Category Filter */}
                    <div className="w-full md:w-64">
                        <label className="block font-black text-sm uppercase tracking-widest mb-2">Filter By</label>
                        <select
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="w-full border-4 border-black p-4 font-bold uppercase appearance-none cursor-pointer focus:outline-none focus:bg-neo-accent transition-colors bg-white"
                            style={{ backgroundImage: `url('data:image/svg+xml;utf8,<svg fill="black" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M7 10l5 5 5-5z"/><path d="M0 0h24v24H0z" fill="none"/></svg>')`, backgroundRepeat: 'no-repeat', backgroundPositionX: '95%', backgroundPositionY: 'center' }}
                        >
                            <option value="">ALL CATEGORIES</option>
                            {categories.map(cat => (
                                <option key={cat} value={cat}>{cat.toUpperCase()}</option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Loading State */}
                {loading && (
                    <div className="py-24 flex flex-col items-center justify-center">
                        <div className="w-16 h-16 border-8 border-black border-t-neo-accent rounded-full animate-spin mb-4"></div>
                        <h2 className="text-3xl font-black uppercase tracking-widest animate-pulse">Loading Drops...</h2>
                    </div>
                )}

                {/* Error State */}
                {!loading && error && (
                    <div className="border-4 border-black bg-[#FF4545] p-8 neo-shadow-md transform -rotate-1 my-12 text-center">
                        <h2 className="text-4xl font-black uppercase mb-2 text-white">FATAL ERROR</h2>
                        <p className="text-xl font-bold uppercase text-black">{error}</p>
                        <button onClick={fetchProducts} className="mt-6 border-4 border-black bg-white px-6 py-2 font-black uppercase tracking-widest hover:bg-black hover:text-white transition-colors">
                            RETRY CONNECTION
                        </button>
                    </div>
                )}

                {/* Empty State */}
                {!loading && !error && products.length === 0 && (
                    <div className="border-4 border-black bg-neo-muted p-12 text-center py-24 my-12 neo-shadow-sm">
                        <h2 className="text-5xl font-black uppercase mb-4">NOTHING HERE.</h2>
                        <p className="text-xl font-bold uppercase mb-8">No products match your criteria. We probably sold out or you can't spell.</p>
                        <button
                            onClick={() => { setSearchTerm(''); setCategory(''); }}
                            className="border-4 border-black bg-neo-secondary px-8 py-3 font-black uppercase text-xl hover:bg-black hover:text-white transition-colors"
                        >
                            CLEAR FILTERS
                        </button>
                    </div>
                )}

                {/* Product Grid */}
                {!loading && !error && products.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {products.map(product => (
                            <ProductCard key={product._id} product={product} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Products;
