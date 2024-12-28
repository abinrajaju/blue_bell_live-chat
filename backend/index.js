import express from "express"
import authRoute from "./src/routes/auth.route.js"
import messageRoute from "./src/routes/message.route.js"
import dotenv from 'dotenv'
import { connectDB } from "./src/lib/db.js"
import cookieParser from "cookie-parser"
import cors from "cors"


dotenv.config()
const app= express()
const PORT =process.env.PORT||5001
app.use(cookieParser());
app.use(express.json());
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))

connectDB()






app.use("/auth",authRoute)
app.use("/message",messageRoute)
app.listen(PORT, ()=>{
    console.log('running in'+PORT);
    
})

