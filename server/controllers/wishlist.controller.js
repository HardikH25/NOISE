import CustomerModel from "../models/customer.model.js";
import ProductModel from "../models/product.model.js";

export const addProductToWishlist = async (req, res) => {
    try {
        const { productId } = req.params;
        const customerId = req.customer._id;
        // Check if product ID is a valid MongoDB ObjectId
        if (!productId.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).json({ success: false, message: "Invalid product ID" });
        }

        const product = await ProductModel.findById(productId);
        if (!product) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }

        const customer = await CustomerModel.findById(customerId);

        // Check if product is already in the wishlist
        if (customer.wishlist.some(id => id.toString() === productId.toString())) {
            return res.status(409).json({ success: false, message: "Product already in wishlist" });
        }

        // Add to wishlist and save
        customer.wishlist.push(productId);
        await customer.save();

        return res.status(200).json({ success: true, message: "Product added to wishlist" });
    } catch (error) {
        console.error("Error in addProductToWishlist:", error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
};

export const getWishlist = async (req, res) => {
    try {
        const customerId = req.customer._id;

        // Find the customer and populate the wishlist field
        const customer = await CustomerModel.findById(customerId).populate({
            path: 'wishlist',
            select: 'name description price category image stock'
        });

        if (!customer) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        return res.status(200).json({
            success: true,
            count: customer.wishlist.length,
            wishlist: customer.wishlist
        });
    } catch (error) {
        console.error("Error in getWishlist:", error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
};

export const removeProductFromWishlist = async (req, res) => {
    try {
        const { productId } = req.params;
        const customerId = req.customer._id;

        // Check if product ID is a valid MongoDB ObjectId
        if (!productId.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).json({ success: false, message: "Invalid product ID" });
        }

        const customer = await CustomerModel.findById(customerId);

        if (!customer) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        // Check if product is actually in the wishlist
        if (!customer.wishlist.some(id => id.toString() === productId)) {
            return res.status(404).json({ success: false, message: "Product not found in wishlist" });
        }

        // Remove the product from the array
        customer.wishlist = customer.wishlist.filter(id => id.toString() !== productId.toString());
        await customer.save();

        return res.status(200).json({ success: true, message: "Product removed from wishlist" });
    } catch (error) {
        console.error("Error in removeProductFromWishlist:", error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
};
