const jwt = require('jsonwebtoken');

module.exports=(req,res,next)=>{
    try{
        const token=req.headers.authorization.split(" ")[1];
        const decoded=jwt.verify(token,{expiresIn:'30s'},'secretpassword');
        req.userData=decoded;
        next();
    } catch(error){
        return res.status(401).json({
            message:'Auth failed,token missing'
        });
    }
    

};