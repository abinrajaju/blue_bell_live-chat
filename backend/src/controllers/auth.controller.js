import { generateToken } from "../llib/util"
import User from "../models/user_model"
import bcrypt from "bcryptjs"


const signup= async(req,res)=>{
    const {name,email,password}= req.body
    try {
        if(password.lenght<6){
            return res.status(400).json({message:"password must bet at least 6 character"})
        }
        const user = await User.findOne({email})
        if(user){
            return res.status(400).json({message:"Email already exist"})
        }
        const salt = await bcrypt.genSalt(10)
        const hashedPassword= await bcrypt.hash(password,salt)
        const newuser= new user({
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

 const login=(req,res)=>{
    res.send("login route")
 }

 const logout=(req,res)=>{
    res.send("logout route")
 }




 export{
    signup,login,logout
 }