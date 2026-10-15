import crypto from 'crypto';
import OrderModel from '../models/order.model.js';
import CustomerModel from '../models/customer.model.js';
import ProductModel from '../models/product.model.js';
import razorpay from '../config/razorpay.js';


export const createPaymentOrder = async (req, res) => {
    try {
        const { shippingAddress } = req.body;

        // 1. Validate shipping address on the server
        if (
            !shippingAddress ||
            !shippingAddress.fullName?.trim() ||
            !shippingAddress.phone?.trim() ||
            !shippingAddress.addressLine1?.trim() ||
            !shippingAddress.city?.trim() ||
            !shippingAddress.state?.trim() ||
            !shippingAddress.pincode?.trim()
        ) {
            return res.status(400).json({
                success: false,
                message: "All shipping address fields are required"
            });
        }

        // Validate phone number format (10 digits)
        if (!/^[0-9]{10}$/.test(shippingAddress.phone.trim())) {
            return res.status(400).json({
                success: false,
                message: "Phone number must be a valid 10-digit number"
            });
        }

        // Validate pincode format (6 digits)
        if (!/^[0-9]{6}$/.test(shippingAddress.pincode.trim())) {
            return res.status(400).json({
                success: false,
                message: "Pincode must contain 6 digits"
            });
        }

        // 2. Load latest customer cart from database
        const customer = await CustomerModel.findById(req.customer._id);
        if (!customer) {
            return res.status(404).json({ success: false, message: "Customer not found" });
        }

        if (!customer.cart || customer.cart.length === 0) {
            return res.status(400).json({
                success: false,
                message: "Your cart is empty. Add products before checking out."
            });
        }

        // 3. Load latest product data and verify stock
        let calculatedTotal = 0;
        const snapshotItems = [];

        for (const cartItem of customer.cart) {
            const product = await ProductModel.findById(cartItem.product);
            if (!product) {
                return res.status(400).json({
                    success: false,
                    message: "One or more products in your cart no longer exist."
                });
            }

            // Stock check
            if (cartItem.quantity > product.stock) {
                return res.status(400).json({
                    success: false,
                    message: `Insufficient stock for ${product.name}. Only ${product.stock} available.`
                });
            }

            // Server-side total calculation: never trust client price or total
            calculatedTotal += product.price * cartItem.quantity;

            // Build snapshot item
            snapshotItems.push({
                product: product._id,
                name: product.name,
                price: product.price,
                quantity: cartItem.quantity,
                image: product.image
            });
        }

        // 4. Create NOISE Pending Order in MongoDB
        const noiceOrder = new OrderModel({
            customer: customer._id,
            items: snapshotItems,
            shippingAddress: {
                fullName: shippingAddress.fullName.trim(),
                phone: shippingAddress.phone.trim(),
                addressLine1: shippingAddress.addressLine1.trim(),
                city: shippingAddress.city.trim(),
                state: shippingAddress.state.trim(),
                pincode: shippingAddress.pincode.trim()
            },
            totalAmount: calculatedTotal,
            paymentStatus: "PENDING",
            status: "PENDING_PAYMENT"
        });

        await noiceOrder.save();

        // 5. Create Razorpay Order (amount in paise: totalAmount * 100)
        const amountInPaise = Math.round(calculatedTotal * 100);
        const razorpayOrder = await razorpay.orders.create({
            amount: amountInPaise,
            currency: "INR",
            receipt: noiceOrder._id.toString()
        });

        // 6. Save razorpayOrderId to the order
        noiceOrder.razorpayOrderId = razorpayOrder.id;
        await noiceOrder.save();

        // 7. Return safe checkout details (Never expose RAZORPAY_KEY_SECRET)
        return res.status(201).json({
            success: true,
            noiceOrderId: noiceOrder._id,
            razorpayOrderId: razorpayOrder.id,
            amount: razorpayOrder.amount,
            currency: razorpayOrder.currency,
            key: process.env.RAZORPAY_KEY_ID//
        });
    } catch (error) {
        console.error("Error creating payment order:", error);
        return res.status(500).json({
            success: false,
            message: error.message || "Failed to create payment order"
        });
    }
};

export const verifyPayment = async (req, res) => {
    try {
        const { noiceOrderId, razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

        if (!noiceOrderId || !razorpay_payment_id || !razorpay_signature) {
            return res.status(400).json({
                success: false,
                message: "Missing payment verification parameters"
            });
        }

        const order = await OrderModel.findById(noiceOrderId);
        if (!order) {
            return res.status(404).json({ success: false, message: "Order not found" });
        }

        // Verify order ownership
        if (order.customer.toString() !== req.customer._id.toString()) {
            return res.status(403).json({ success: false, message: "Unauthorized access to order" });
        }

        // HMAC SHA256 Signature Verification
        // Use trusted order.razorpayOrderId from database, not unverified browser string
        const body = order.razorpayOrderId + "|" + razorpay_payment_id;
        const expectedSignature = crypto
            .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
            .update(body)
            .digest("hex");

        if (expectedSignature !== razorpay_signature) {
            order.paymentStatus = "FAILED";
            await order.save();
            return res.status(400).json({
                success: false,
                message: "Invalid payment signature. Payment verification failed."
            });
        }

        // Stock pre-check: verify all items in the order still have sufficient inventory
        for (const item of order.items) {
            const product = await ProductModel.findById(item.product);
            if (!product) {
                return res.status(400).json({
                    success: false,
                    message: `Product ${item.name} is no longer available.`
                });
            }

            if (item.quantity > product.stock) {
                return res.status(400).json({
                    success: false,
                    message: `Insufficient stock for ${product.name}. Only ${product.stock} available.`
                });
            }
        }

        // Signature is valid & stock is verified: Confirm Order
        order.paymentStatus = "PAID";
        order.status = "PLACED";
        order.razorpayPaymentId = razorpay_payment_id;
        await order.save();

        // Reduce inventory stock
        for (const item of order.items) {
            const productDoc = await ProductModel.findById(item.product);
            if (productDoc) {
                productDoc.stock = productDoc.stock - item.quantity;
                await productDoc.save();
            }
        }

        // Clear user cart in MongoDB only after verified payment
        const customer = await CustomerModel.findById(req.customer._id);
        if (customer) {
            customer.cart = [];
            await customer.save();
        }

        return res.status(200).json({
            success: true,
            message: "Payment verified and order placed successfully",
            order
        });
    } catch (error) {
        console.error("Error verifying payment:", error);
        return res.status(500).json({
            success: false,
            message: error.message || "Failed to verify payment"
        });
    }
};

export const getMyOrders = async (req, res) => {
    try {
        const orders = await OrderModel.find({ customer: req.customer._id }).sort({ createdAt: -1 });
        return res.status(200).json({
            success: true,
            orders
        });
    } catch (error) {
        console.error("Error fetching orders:", error);
        return res.status(500).json({
            success: false,
            message: error.message || "Failed to fetch orders"
        });
    }
};

export const getOrderById = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).json({ success: false, message: "Invalid order ID format" });
        }

        const order = await OrderModel.findById(id);
        if (!order) {
            return res.status(404).json({ success: false, message: "Order not found" });
        }

        // Enforce ownership
        if (order.customer.toString() !== req.customer._id.toString()) {
            return res.status(403).json({ success: false, message: "Unauthorized access to this order" });
        }

        return res.status(200).json({
            success: true,
            order,
            key: order.paymentStatus !== 'PAID' ? process.env.RAZORPAY_KEY_ID : undefined
        });
    } catch (error) {
        console.error("Error fetching order:", error);
        return res.status(500).json({
            success: false,
            message: error.message || "Failed to fetch order"
        });
    }
};
