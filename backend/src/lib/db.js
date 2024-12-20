import mongoose from "mongoose";

export const connectDB=async ()=>{
    try {
        await mongoose.connect(process.env.MONGODB_URL)
        console.log('db is connected');
        
    } catch (error) {
        console.log('db sone err' +error);
        
    }
}
