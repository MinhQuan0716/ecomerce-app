
import jwt from 'jsonwebtoken';

const adminAuth=async (req,res,next)=>{
    try {
       // console.log(req.headers);
      //  const authHeader = req.headers.authorization;
      //  if (!authHeader) {
       //     return res.status(400).json({ success: false, message: "Login again" });
      //  }
    
      //  const token = authHeader.split(' ')[1]; // Extract the token from the 'Bearer {{TOKEN}}' format
        const token=req.headers.token;
        if(!token|| typeof token !== 'string'){
            return res.status(400).json({success:false,message:"Login again"})
        }
        const decodedToken=jwt.verify(token,process.env.JWT_SECRET);
        if(decodedToken!==process.env.ADMIN_EMAIL+process.env.ADMIN_PASSWORD){
            return res.status(401).json({success:false,message:"Invalid token"})
        }
        next()
    } catch (error) {
        console.log(error);
        res.status(500).json({success:false, message: "Internal Server Error" });
        
    }
};
export default adminAuth;