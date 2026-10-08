import CustomerModel from "../models/customer.model.js";
import ProductModel from "../models/product.model.js";

// ADD TO CART API
export const addToCart = async (req, res) => {
    try {
        const customerId = req.customer._id;
        const { productId } = req.params;

        //Check if product ID is a valid MongoDB ObjectId
        if (!productId.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).json({ success: false, message: "Invalid product ID format" });
        }

        const product = await ProductModel.findById(productId);
        if (!product) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }
        const customer = await CustomerModel.findById(customerId);
        // 4. Check if product is already in cart
        const cartItemIndex = customer.cart.findIndex(
            (item) => item.product.toString() === productId.toString()
        );

        if (cartItemIndex > -1) {
            // Product IS in cart -> Increase quantity by 1
            const newQuantity = customer.cart[cartItemIndex].quantity + 1;

            // Check stock limit
            if (newQuantity > product.stock) {
                return res.status(400).json({ success: false, message: `Only ${product.stock} items available in stock.` });
            }
            customer.cart[cartItemIndex].quantity = newQuantity;
        } else {
            // Product IS NOT in cart -> Add as new item with quantity 1
            // Check stock limit before adding
            if (product.stock < 1) {
                return res.status(400).json({ success: false, message: "Product is out of stock" });
            }

            customer.cart.push({
                product: productId,
                quantity: 1
            });
        }

        // Save changes
        await customer.save();

        // Populate product data before sending response
        await customer.populate({
            path: "cart.product",
            select: "name price image stock category"
        });

        return res.status(200).json({
            success: true,
            message: "Cart updated successfully",
            cart: customer.cart
        });
        //         "cart": [
        //   {
        //     "product": {
        //       "_id": "66d123...",
        //       "name": "Mechanical Keyboard",
        //       "price": 2999,
        //       "image": "https://example.com/keyboard.jpg",
        //       "stock": 10
        //     },
        //     "quantity": 2
        //   }
        // ]


    } catch (error) {
        console.error("Error in addToCart:", error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
};

// GET CUSTOMER'S CART
export const getCart = async (req, res) => {
    try {
        const customerId = req.customer._id;

        // Find customer and populate specific product details in the cart
        const customer = await CustomerModel.findById(customerId).populate({
            path: "cart.product",
            select: "name price image stock category"
        });

        if (!customer) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        return res.status(200).json({
            success: true,
            cart: customer.cart
        });
    } catch (error) {
        console.error("Error in getCart:", error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
};

// UPDATE CART QUANTITY
export const updateCartQuantity = async (req, res) => {
    try {
        const customerId = req.customer._id;
        const { productId } = req.params;
        const { quantity } = req.body;

        // Validations
        if (!productId.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).json({ success: false, message: "Invalid product ID format" });
        }
        if (typeof quantity !== "number" || quantity < 1) {
            return res.status(400).json({ success: false, message: "Quantity must be a number and at least 1" });
        }

        // Find customer
        const customer = await CustomerModel.findById(customerId)
        if (!customer) {
            return res.status(401).json({ success: false, message: "Unauthorized" });
        }
        // Find product in cart
        const cartItemIndex = customer.cart.findIndex((item) => {
            return item.product.toString() === productId.toString()
        })
        if (cartItemIndex === -1) {
            return res.status(404).json({ success: false, message: "Product not in cart" });
        }
        // Check stock
        const product = await ProductModel.findById(productId)
        if (!product) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }
        if (quantity > product.stock) {
            return res.status(400).json({ success: false, message: `Only ${product.stock} items available in stock.` });
        }
        // Update quantity
        customer.cart[cartItemIndex].quantity = quantity
        await customer.save();
        // Populate and return
        await customer.populate({
            path: 'cart.product',
            select: "name price image stock category"
        })
        return res.status(200).json({
            success: true,
            message: "Quantity updated",
            cart: customer.cart
        });
    } catch (error) {
        console.error("Error in updateCartQuantity:", error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
};

// REMOVE FROM CART
export const removeFromCart = async (req, res) => {
    try {
        const customerId = req.customer._id;
        const { productId } = req.params;

        if (!productId.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).json({ success: false, message: "Invalid product ID format" });
        }

        const customer = await CustomerModel.findById(customerId);
        if (!customer) {
            return res.status(401).json({ success: false, message: "Unauthorized" });
        }

        // Filter out the product to remove it
        const initialLength = customer.cart.length;
        customer.cart = customer.cart.filter(
            (item) => item.product.toString() !== productId.toString()
        );

        if (customer.cart.length === initialLength) {
            return res.status(404).json({ success: false, message: "Product not found in cart" });
        }

        await customer.save();

        // Populate and return
        await customer.populate({
            path: "cart.product",
            select: "name price image stock category"
        });

        return res.status(200).json({
            success: true,
            message: "Product removed from cart",
            cart: customer.cart
        });

    } catch (error) {
        console.error("Error in removeFromCart:", error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
};


