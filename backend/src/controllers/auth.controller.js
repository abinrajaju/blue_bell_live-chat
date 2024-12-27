import { generateToken } from "../lib/util.js"
import User from "../models/user_model.js"
import bcrypt from "bcryptjs"
import cloudinary from "../lib/cloudinary.js"


const signup= async(req,res)=>{ 
    
    
    const { name, email, password } = req.body;
    try {
        if (!name||!email||!password){
            return res.status(400).json({message:"fill the form fully"})
        }
        if(password.length<6){
            return res.status(400).json({message:"password must bet at least 6 character"})
        }
        const user = await User.findOne({email})
        if(user){
            return res.status(400).json({message:"Email already exist"})
        }
        const salt = await bcrypt.genSalt(10)
        const hashedPassword= await bcrypt.hash(password,salt)
        const newuser= new User({
            name,
            email,
            password:hashedPassword,
        })
        if(newuser){
            generateToken(newuser._id,res)
            await newuser.save()
            res.status(201).json({
                _id:newuser._id,
                name:newuser.name,
                email:newuser.email,
                profilePic:newuser.profilePic
            })

        }else{
            res.status(400).json({message:"invalid user data"})
        }

    } catch (error) {
        console.log("error in singup controller",error.message);
        res.status(500).json({message:"internal server error"})
        
    }
 }

 const login= async(req,res)=>{
    const {email, password } = req.body;
    try {
        const user = await User.findOne({email})
        if(!user){
            return res.status(400).json({message:"user not exits"})
        }
     const ispassword=  await bcrypt.compare(password,user.password)
     if(!ispassword){
        return res.status(400).json({message:"password is wrong"})
    }
    generateToken(user._id,res);
    res.status(200).json({
        _id:user._id,
        name:user.name,
        email:user.password,
        profilePic:user.profilePic

    })

    } catch (err) {
             console.log("login error",err.message);
             res.status(500).jason({message:"internal error"})
    }
 }

 const logout= async(req,res)=>{
    try {
        res.cookie("jwt","",{maxAge:0});
        res.status(200).json({message:"logout succesfully"})
        
    } catch (error) {
        console.log("error from logout",error.message);
          res.status(500).json({message:"internal server error"})
    }
 }


 const updateProfile= async(req,res)=>{
try {
          const {profilePic}= req.body
          const userId= req.user._id;
          if(!profilePic){
            return res.status(400).json({message:"profile pic is required"})
          }
          const uplodeResponse= await cloudinary.uploader.uplode(profilePic)
          const updateUser= await User.findByIdAndUpdate(userId,{profilePic:uplodeResponse.secure_url},{new:true})
          res.status(200).json(updateUser)
} catch (error) {
    console.log("error from updateprofile",error.message);
          res.status(500).json({message:"internal server error"})
}
 }

 const checkAuth=async(req,res)=>{
    try {
        
        res.status(200).json(req.user)
        
        

    } catch (error) {
        console.log("error from checkAuth controller",error.message);
          res.status(500).json({message:"internal server error"})
    }

 }



 export{
    signup,login,logout,updateProfile,checkAuth
 }