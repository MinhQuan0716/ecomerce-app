import jwt from 'jsonwebtoken';
import validator from 'validator';
import bcrypt from 'bcrypt';
import userModel from '../models/userModel.js';
const createToken=(id)=>{
    return jwt.sign({id},process.env.JWT_SECRET);
}

// Route for login
const loginUser=async (req,res)=>{
try {
    const {email,password}=req.body;
    const findUser=await userModel.findOne({email});
    if(!findUser){
        return res.status(400).json({success:false,message:"User not found"})
    }
    const isMatch=await bcrypt.compare(password,findUser.password);
    if(!isMatch){
        return res.status(400).json({success:false,message:"Invalid password"})
    } else{
        const token=createToken(findUser._id);
        res.status(200).json({success:true,message:"User logged in successfully",token})
    }
} catch (error) {
    console.log(error);
}
}
// Route for register
const registerUser=async (req,res)=>{
try {
    const {name,email,password}=req.body;
    if(!name || !email || !password){
        return res.status(400).json({success:false,message:"Please fill all the fields"})
    }
    if(!validator.isEmail(email)){
        return res.status(400).json({success:false,message:"Please enter a valid email"})
    }
    if(password.length<8){
        return res.status(400).json({success:false,message:"Password should be atleast 6 characters"})
    }
    const user=await userModel.findOne({email});
    if(user){
        return res.status(500).json({success:false,message:"User already exists"})
    }
    const salt=await bcrypt.genSalt(10);
    const hashedPassword=await bcrypt.hash(password,salt);
    const newUser=new userModel({
        name,
        email,
        password:hashedPassword
    });
    const savedUser=await newUser.save();
    const token = createToken(savedUser._id);
    res.status(200).json({success:false,message:"User registered successfully",token})
    
} catch (error) {
    console.log(error);
    res.status(500).json({success:false,message:"Internal server error"})
}
}

//Route for admin login
const adminLogin=async (req,res)=>{
try {
    const {email,password}=req.body;
    if(email!==process.env.ADMIN_EMAIL || password!==process.env.ADMIN_PASSWORD){
        return res.status(400).json({success:false,message:"Invalid credentials"})
    }
    const token=jwt.sign(email+password,process.env.JWT_SECRET);
    res.status(200).json({success:true,message:"Admin logged in successfully",token})
} catch (error) {
    console.log(error);
    res.status(500).json({success:false,message:"Internal server error"})
}
}
export {loginUser,registerUser,adminLogin} 