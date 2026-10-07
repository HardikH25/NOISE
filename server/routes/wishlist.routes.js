import express from "express";
import { isAuthenticated } from "../middlewares/authMiddleware.js";
import { addProductToWishlist, getWishlist, removeProductFromWishlist } from "../controllers/wishlist.controller.js";

const router = express.Router();

router.get("/", isAuthenticated, getWishlist);
router.post("/:productId", isAuthenticated, addProductToWishlist);
router.delete("/:productId", isAuthenticated, removeProductFromWishlist);

export default router;
