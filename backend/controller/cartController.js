import userModel from "../models/userModel.js";
// Add Product to Cart
const addToCart = async (req, res) => {
    try{
    const {userId,itemId,size}=req.body;
    const userData=await userModel.findById(userId);
    let cartData=await userData.cartData;
    if(cartData[itemId]){
       if(cartData[itemId][size]){
           cartData[itemId][size]+=1;
}
else{
    cartData[itemId][size]=1;
 }
} else{
    cartData[itemId]={};
    cartData[itemId][size]=1;
}
await userModel.findByIdAndUpdate(userId,{cartData});
return res.status(200).json({success:true,msg:'Item added to cart'});
} catch(err){
    return res.status(500).json({success:false,msg:err.message});
}
};
// Get User Cart
const getCart = async (req, res) => {
    try{
        const {userId}=req.body;
        const userData=await userModel.findById(userId);
        const cartData=await userData.cartData;
        return res.status(200).json({success:true,cartData});
    } catch(err){
        return res.status(500).json({success:false,msg:err.message});
    }
};
// Update Cart
const updateCart = async (req, res) => {
    try{
        const {userId,itemId,size,quantity}=req.body;
        const userData=await userModel.findById(userId);
        let cartData=await userData.cartData;
        cartData[itemId][size]=quantity;
        await userModel.findByIdAndUpdate(userId,{cartData});
        return res.status(200).json({success:true,msg:'Cart updated'});
    } catch(err){
        return res.status(500).json({success:false,msg:err.message});
    }
};
export { addToCart, getCart, updateCart };