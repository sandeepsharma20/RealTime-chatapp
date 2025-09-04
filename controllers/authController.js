 import express from 'express'
 import bcrypt from "bcryptjs"
import jwt from 'jsonwebtoken'
import User from './../models/user.js'
const router=express.Router()
 router.post('/signup', async (req,res) =>{
   try {
    //if user is already exits
   const user=await User.findOne({email:req.body.email})
   // if user exits send error message

  if(user){
      return res.send({
    message:'user already exit',
    success:false
   })
  }
  // encrypt the pass
  const hashPassword=await bcrypt.hash(req.body.password,10);
  req.body.password=hashPassword;
 


  //if user not exits
 const newUser= new User(req.body);
  await newUser.save()
  res.send({
    message:"user created succesfulyy",
    success:true
  })

   } catch (error) {
    res.send({
        message:error.message,
        success:false
    })
   }
 })
 router.post('/login', async (req,res)=>{
 try {
  //cheack if user exits
 const user=  await User.findOne({email:req.body.email})
 if(!user){
   return res.send({
    message:'user does not exit',
    success:false
  })
 }
//if passowrd is correct
 const isvalid=await bcrypt.compare(req.body.password,user.password)
if(!isvalid){
   return res.send({
    message:'passowrd not match',
    success:false
  })
}
//if user exist and password match
const token= jwt.sign({userId:user._id},process.env. SECRET_KEY,{expiresIn:"1d"});
 res.send({
  message:"user loggin succesfully ",
  success:true,
  token:token
 })




 } catch (error) {
  res.send({
    message:error.message,
    success:false
  })
 }
 })
 
 export default router