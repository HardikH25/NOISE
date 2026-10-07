import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required, don't be lazy."] //this is the Error.response.data.error
    },
    description: {
        type: String,
        required: [true, "Description is required. Tell them what they are buying!"]
    },
    price: {
        type: Number,
        required: [true, "Price is required. We aren't giving stuff for free."],
        min: [1, "Price must be greater than 0. Stop playing games."]
    },
    category: {
        type: String,
        required: [true, "Category is required. Organize your mess."]
    },
    image: {
        type: String,
        required: [true, "Image URL is required. Let them see the drip."]
    },
    stock: {
        type: Number,
        required: [true, "Stock is required. Inventory management 101."],
        min: [0, "Stock cannot be negative. We can't sell ghosts."]
    }
}, { timestamps: true });

const ProductModel = mongoose.model('product', productSchema);
export default ProductModel;
