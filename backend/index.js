import express from "express"
import authRoute from "./src/routes/auth.route.js"
import messageRoute from "./src/routes/message.route.js"
import dotenv from 'dotenv'
import { connectDB } from "./src/lib/db.js"
import cookieParser from "cookie-parser"
import cors from "cors"
import { app,io,server } from "./src/lib/socket.js"

dotenv.config()

const PORT =process.env.PORT||5001
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

app.use(cookieParser())
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))

connectDB()






app.use("/auth",authRoute)
app.use("/messages",messageRoute)
server.listen(PORT, ()=>{
    console.log('running in'+PORT);
    
})

