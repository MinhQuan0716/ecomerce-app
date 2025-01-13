import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
// Plaing Order for COD payment method
const placeOrder = async (req, res) => {
    try {
       const {userId,items,amount,address}=req.body;
      const orderData={
            userId,
            items,
            amount,
            address,
            paymentMethod:"COD",
            payment:false,
            date:Date.now()
      }
      const order=new orderModel(orderData);
        await order.save();
        await userModel.findByIdAndUpdate(userId,{cartData:{}});
        res.status(200).json({ success: true, message: "Order placed successfully", order });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}
//Placing Order for Stripe Payment method
const placeOrderStripe = async (req, res) =>{}
// Place Order for RazorPay Payment method
const placeOrderRazorPay = async (req, res) =>{}
// Get all Orders for Admin
const getAllOrders = async (req, res) =>{
    try {
        const listOrder=await orderModel.find({});
        res.status(200).json({ success: true, listOrder });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
        
    }
}
// Get all Orders for User
const getUserOrders = async (req, res) =>{
    try {
        const {userId}=req.body;
        const orders=await orderModel.find({userId});
        res.status(200).json({ success: true, orders });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}
// Update Order Status for Admin
const updateOrderStatus = async (req, res) =>{
    try{
        const {orderId,status}=req.body;
        await orderModel.findByIdAndUpdate(orderId,{status});
        res.status(200).json({ success: true, message: "Order status updated successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}
export { placeOrder, placeOrderStripe, placeOrderRazorPay, getAllOrders, getUserOrders, updateOrderStatus };