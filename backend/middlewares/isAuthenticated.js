const jwt =require("jsonwebtoken")
const isAuthenticated=async(req,res,next)=>{
    //! get token from header
    const headerObj=req.headers;
    const token=headerObj?.authorization?.split(' ')[1];
    //!verify  token
    const verifyToken= jwt.verify(token,"pradeesh",(err,decoded)=>{
        if(err){
            return false;
        }
        else{
            return decoded;
        }
    })
    if(verifyToken)
    {
        req.user=verifyToken.id;
        next();
    }
    else{
        const err=new Error("Token expired , relogin please")
        next(err);
    }
}
module.exports=isAuthenticated;