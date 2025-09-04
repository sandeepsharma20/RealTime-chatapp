
   import express from 'express'
   import User from './../models/user.js'
   import authMiddleware from './../middlewares/authMiddleware.js'
   const router=express.Router()
   router.get('/get-logged-user',authMiddleware,async(req,res)=>{
      try {
           const user = await User.findById(req.user.userId).select("-password");
         res.send({
            message:'user fetched successfulyy',
            success:true,
             data:user
          
        })
      } catch (error) {
         console.error("Error in /get-logged-user:", error.message);
        res.send({
            message:error.message,
            success:false
        })
      }
   })
   // for all user details

   router.get('/get-all-user',authMiddleware,async(req,res)=>{
      try {
          const allusers = await User.find({ _id: { $ne: req.user.userId } }).select(
      "-password"
    );
         res.send({
            message:' all user fetched successfulyy',
            success:true,
             data:allusers
          
        })
      } catch (error) {
         console.error("Error in /get-logged-user:", error.message);
        res.send({
            message:error.message,
            success:false
        })
      }
   })


   export default router;
  
  