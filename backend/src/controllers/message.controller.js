import cloudinary from "../lib/cloudinary.js"
import Message from "../models/message.model.js"
import User from "../models/user_model.js"


const userInSidebar=async(req,res)=>{
       try {
        const loggedInUserId=req.user._id
        const fillterdUseres= await User.find({_id:{$ne:loggedInUserId}}).select("-password")
        res.status(200).json(fillterdUseres)
       } catch (error) {
        console.log("error from get user for sidebar",error.message);
        res.status(500).json({message:"internal server error"})
       }
}


const getMessage=async(req,res)=>{
    try {
        const {id:userToChatId}= req.params
        const senderId=req.user._id;
        const messages = await Message.find({
            $or:[{senderId:senderId,receiverId:userToChatId},
                {senderId:userToChatId,receiverId:senderId}
            ]
        } )

        res.status(200).json(messages)
    } catch (error) {
        console.log("error from get message controller",error.message);
        res.status(500).json({message:"internal server error"})
    }
}

const sendMessage =async(req,res)=>{
    try {
        const {text,image}=req.body;
        const {id:receiverId}=req.params
        const senderId= req.user._id
        let imageUrl
        if(image){
            const uplodeResponse= await cloudinary.uploader.upload(image)
            imageUrl= uplodeResponse.secure_url;
        }
        const newMessage= new Message({
            senderId,
            receiverId,
            text,
            image:imageUrl
        })
        await newMessage.save()
        res.status(200).json(newMessage)

    } catch (error){
        console.log("error from send messege",error.message);
        res.status(500).json({message:"internal server error"})
        
    }
}

export{
    userInSidebar,getMessage,sendMessage
}