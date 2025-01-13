import express from 'express';
import { placeOrder,placeOrderStripe,placeOrderRazorPay,getAllOrders,getUserOrders,updateOrderStatus } from '../controller/orderController.js';
import adminAuth from '../middleware/adminAuth.js';
import authUser from '../middleware/auth.js';
const orderRouter = express.Router();
// Admin routes
orderRouter.post('/list',adminAuth, getAllOrders);
orderRouter.post('/status',adminAuth, updateOrderStatus);
//Payment method routes
orderRouter.post('/place',authUser,placeOrder);
orderRouter.post('/stripe',authUser,placeOrderStripe);
orderRouter.post('/razorpay',authUser,placeOrderRazorPay);
orderRouter.post('/userorders',authUser,getUserOrders);
export default orderRouter;