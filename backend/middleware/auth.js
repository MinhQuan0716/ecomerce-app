import jwt from 'jsonwebtoken';
const authUser=async(req,res,next)=>{
    const token=req.headers.token;
    if(!token){
        return res.status(401).json({success:true,msg:'No token, Authorization Denied'});
    }
    try{
        const decoded=jwt.verify(token,process.env.JWT_SECRET);
        req.body.userId=decoded.id;
        next();
    }catch(err){
        return res.status(500).json({success:false,msg:err.msg});
    }
};
export default authUser;