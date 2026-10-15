import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { axiosInstance } from '../axiosCalls/axios';

const Orders = () => {
    const navigate = useNavigate();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axiosInstance.get('/orders');
                setOrders(response.data.orders || []);
            } catch (err) {
                console.error('Error fetching orders:', err);
                setError(err.response?.data?.message || 'Failed to load orders.');
            } finally {
                setLoading(false);
            }
        };
        fetchOrders();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen bg-neo-bg flex items-center justify-center p-6">
                <div className="border-4 border-black p-8 bg-white neo-shadow-lg text-2xl font-black uppercase tracking-widest">
                    LOADING YOUR ORDERS...
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-neo-bg font-sans p-4 md:p-8">
            <div className="max-w-5xl mx-auto">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between border-b-4 border-black pb-4 mb-8 gap-4">
                    <div>
                        <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tight">
                            MY ORDERS
                        </h1>
                        <p className="font-bold text-gray-600 uppercase text-sm mt-1">
                            {orders.length} {orders.length === 1 ? 'Order' : 'Orders'} Placed
                        </p>
                    </div>
                    <button
                        onClick={() => navigate('/products')}
                        className="bg-neo-secondary border-3 border-black px-4 py-2 font-black uppercase text-sm tracking-wider hover:-translate-y-1 hover:neo-shadow-sm transition-all cursor-pointer self-start md:self-auto"
                    >
                        BROWSE PRODUCTS ➔
                    </button>
                </div>

                {/* Error Banner */}
                {error && (
                    <div className="mb-8 bg-[#FF4545] text-white border-4 border-black p-4 neo-shadow-md font-black uppercase">
                        ⚠️ {error}
                    </div>
                )}

                {/* Empty State */}
                {orders.length === 0 && !error ? (
                    <div className="bg-white border-4 border-black p-10 neo-shadow-lg text-center max-w-lg mx-auto my-12">
                        <span className="text-6xl mb-4 block">📦</span>
                        <h2 className="text-2xl font-black uppercase mb-3">No Orders Yet</h2>
                        <p className="font-bold text-gray-600 mb-6">
                            You have not placed any orders yet. Check out our latest drops!
                        </p>
                        <button
                            onClick={() => navigate('/products')}
                            className="bg-neo-secondary border-3 border-black px-6 py-3 font-black uppercase text-base tracking-wider hover:-translate-y-1 hover:neo-shadow-md transition-all cursor-pointer"
                        >
                            START SHOPPING ➔
                        </button>
                    </div>
                ) : (
                    /* Orders List */
                    <div className="space-y-6">
                        {orders.map((order) => {
                            const dateFormatted = new Date(order.createdAt).toLocaleDateString('en-IN', {
                                day: 'numeric',
                                month: 'short',
                                year: 'numeric'
                            });

                            return (
                                <div
                                    key={order._id}
                                    className="bg-white border-4 border-black p-6 neo-shadow-md transition-all hover:neo-shadow-lg"
                                >
                                    {/* Order Meta Header */}
                                    <div className="flex flex-col md:flex-row md:items-center justify-between border-b-3 border-black pb-4 mb-4 gap-2">
                                        <div>
                                            <span className="text-xs font-black uppercase text-gray-500 block">
                                                ORDER #{order._id}
                                            </span>
                                            <span className="text-sm font-bold text-gray-700">
                                                Placed on {dateFormatted}
                                            </span>
                                        </div>

                                        <div className="flex items-center gap-3">
                                            <span
                                                className={`px-3 py-1 border-2 border-black text-xs font-black uppercase tracking-wider ${
                                                    order.paymentStatus === 'PAID'
                                                        ? 'bg-[#4DEEEA] text-black'
                                                        : order.paymentStatus === 'FAILED'
                                                        ? 'bg-[#FF4545] text-white'
                                                        : 'bg-neo-secondary text-black'
                                                }`}
                                            >
                                                {order.paymentStatus}
                                            </span>
                                            <span
                                                className={`px-3 py-1 border-2 border-black text-xs font-black uppercase tracking-wider ${
                                                    order.status === 'PLACED' || order.status === 'CONFIRMED'
                                                        ? 'bg-[#4E9F3D] text-white'
                                                        : 'bg-black text-white'
                                                }`}
                                            >
                                                {order.status}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Order Items */}
                                    <div className="divide-y-2 divide-gray-200 mb-4">
                                        {order.items?.map((item, index) => (
                                            <div key={index} className="py-3 flex items-center justify-between gap-4">
                                                <div className="flex items-center gap-3 min-w-0">
                                                    {item.image && (
                                                        <img
                                                            src={item.image}
                                                            alt={item.name}
                                                            className="w-12 h-12 object-cover border-2 border-black bg-neo-bg flex-shrink-0"
                                                        />
                                                    )}
                                                    <div className="min-w-0">
                                                        <p className="font-black text-sm uppercase truncate">
                                                            {item.name}
                                                        </p>
                                                        <p className="text-xs font-bold text-gray-500">
                                                            Qty: {item.quantity} × ₹{item.price}
                                                        </p>
                                                    </div>
                                                </div>
                                                <span className="font-black text-sm">
                                                    ₹{item.price * item.quantity}
                                                </span>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Order Footer */}
                                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-t-3 border-black pt-4 gap-3">
                                        <div className="text-xs font-bold text-gray-600">
                                            <span className="font-black uppercase text-black">Delivery: </span>
                                            {order.shippingAddress?.fullName}, {order.shippingAddress?.city} ({order.shippingAddress?.pincode})
                                        </div>
                                        <div className="flex items-center gap-4 self-end sm:self-auto">
                                            <button
                                                onClick={() => navigate(`/order-success/${order._id}`)}
                                                className="bg-white border-2 border-black px-3 py-1 font-black uppercase text-xs hover:bg-black hover:text-white transition-colors cursor-pointer"
                                            >
                                                View Receipt ➔
                                            </button>
                                            <span className="text-sm font-black uppercase">Total:</span>
                                            <span className="text-xl font-black bg-neo-accent text-white px-3 py-1 border-2 border-black">
                                                ₹{order.totalAmount}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Orders;
