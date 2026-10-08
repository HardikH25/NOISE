import express from "express";
import { isAuthenticated } from "../middlewares/authMiddleware.js";
import { addToCart, getCart, updateCartQuantity, removeFromCart } from "../controllers/cart.controller.js";

const cartRouter = express.Router();

cartRouter.post("/:productId", isAuthenticated, addToCart);
cartRouter.get("/", isAuthenticated, getCart);
cartRouter.patch("/:productId", isAuthenticated, updateCartQuantity);
cartRouter.delete("/:productId", isAuthenticated, removeFromCart);

export default cartRouter;
