import productModel from "../models/productModel.js";
import {v2 as cloudinary} from "cloudinary";
const addProduct = async (req, res) => {
    try {
        var {name,price,description,category,subCategory,bestSeller,sizes}=req.body;
        const image1 = req.files.image1 && req.files.image1[0] 
        const image2 = req.files.image2 && req.files.image2[0] 
        const image3 = req.files.image3 && req.files.image3[0] 
        const image4 = req.files.image4 && req.files.image4[0]
        const images = [image1,image2,image3,image4].filter((item)=>item!==undefined);
        let imagesUrl=await Promise.all(
            images.map(async (image)=>{
            let result=await cloudinary.uploader.upload(image.path,{
                resource_type:"image",
            });
            return result.secure_url;
        }));
        const ProductData={
            name,
            price:Number(price),
            description,
            category,
            subCategory,
            bestSeller:bestSeller==="true"?true:false,
            sizes:JSON.parse(sizes),
            image:imagesUrl,
            date:Date.now()
        }
        console.log(ProductData);
        const product=new productModel(ProductData);
        await product.save();
        res.json({success:true,message:"Product added successfully"});
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
        
    }
};
const getProducts = async (req, res) => {
    try {
        const products=await productModel.find();
        res.json({success:true,products});
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
        
    }
};
const getProductById = async (req, res) => {
    try {
        const {productId}=req.body;
        const product=await productModel.findById(productId);
        res.json({success:true,product});
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
        
    }
};
const updateProduct = async (req, res) => {};
const deleteProduct = async (req, res) => {
    try {;
        await productModel.findByIdAndDelete(req.body.id);
        res.json({success:true,message:"Product deleted successfully"});
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};
export {
  addProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};