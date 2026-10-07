import ProductModel from "../models/product.model.js";

export const createProduct = async (req, res) => {
    try {
        const { name, description, price, category, image, stock } = req.body;

        if (!name || !description || price === undefined || !category || !image || stock === undefined) {
            return res.status(400).json({ success: false, message: "Missing required fields. Provide everything." });
        }
        if (Number(price) <= 0) {
            return res.status(400).json({ success: false, message: "Price must be greater than 0. No freebies." });
        }
        if (Number(stock) < 0) {
            return res.status(400).json({ success: false, message: "Stock cannot be negative. We can't owe products." });
        }
        const newProduct = await ProductModel.create({
            name,
            description,
            price: Number(price),
            category,
            image,
            stock: Number(stock)
        });

        res.status(201).json({
            success: true,
            message: "Product created successfully.",
            product: newProduct
        });
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal Server Error. Our bad.", error: error.message });
    }
};
//search plus filter
export const getAllProducts = async (req, res) => {
    try {
        const { search, category } = req.query;
        let query = {};
        //case insens + regex match 
        if (search) {
            query.name = { $regex: search, $options: "i" };
        }
        // Exact match category filtering.
        if (category) {
            query.category = category;
        }
        const products = await ProductModel.find(query); //with just {} an empty obj as query, we tell it to give me everything without filtering
        res.status(200).json({
            success: true,
            count: products.length,
            products
        });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server died while fetching products.", error: error.message });
    }
};
//fetches one specific product by ID. 
export const getProductById = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ success: false, message: "Invalid product ID format." });
        }

        const product = await ProductModel.findById(id);

        if (!product) {
            return res.status(404).json({ success: false, message: "Product not found. Stop looking for ghosts." });
        }

        res.status(200).json({
            success: true,
            product
        });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error fetching the product.", error: error.message });
    }
};
