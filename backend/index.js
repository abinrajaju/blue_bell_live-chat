import express from "express"
import authRoute from "./src/routes/auth.route.js"
import dotenv from 'dotenv'
import { connectDB } from "./src/llib/db.js"



dotenv.config()
const app= express()
const PORT =process.env.PORT

app.use("/",authRoute)
app.use(express.json())








app.listen(PORT, ()=>{
    console.log('running in'+PORT);
    connectDB()
})