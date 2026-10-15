import express from 'express';
import { isAuthenticated } from '../middlewares/authMiddleware.js';
import {
    createPaymentOrder,
    verifyPayment,
    getMyOrders,
    getOrderById
} from '../controllers/order.controller.js';

const orderRouter = express.Router();

orderRouter.post('/create-payment-order', isAuthenticated, createPaymentOrder);
orderRouter.post('/verify-payment', isAuthenticated, verifyPayment);
orderRouter.get('/', isAuthenticated, getMyOrders);
orderRouter.get('/:id', isAuthenticated, getOrderById);

export default orderRouter;
