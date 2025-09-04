import jwt from 'jsonwebtoken'


 export default (req,res,next)=>{
    try{
const token=req.headers.authorization.split(' ')[1];
 
const decoded = jwt.verify(token, process.env.SECRET_KEY);
req.user = { userId: decoded.userId };

 next();
    }catch(error){
        res.send({
            message:'error occur',
            success:false
        })
    }
 }