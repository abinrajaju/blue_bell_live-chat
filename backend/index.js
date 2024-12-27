import express from "express"
import authRoute from "./src/routes/auth.route.js"
import messageRoute from "./src/routes/message.route.js"
import dotenv from 'dotenv'
import { connectDB } from "./src/lib/db.js"
import cookieParser from "cookie-parser"



dotenv.config()
const app= express()
const PORT =process.env.PORT||5001
app.use(cookieParser())
app.use(express.json());

connectDB()






app.use("/auth",authRoute)
app.use("/message",messageRoute)
app.listen(PORT, ()=>{
    console.log('running in'+PORT);
    
})

// import express from "express"
// const app = express();

// // Middleware to parse JSON
// app.use(express.json());

// // Example route
// app.post('/signup', (req, res) => {
//     console.log(req.body);  // Debugging to check if data is received
//     const { name, email, password } = req.body;
    
//     if (!name || !email || !password) {
//         return res.status(400).send('Missing required fields');
//     }
//     res.status(200).send('User data received');
// });

// // Start the server
// app.listen(5000, () => {
//     console.log('Server is running on port 5000');
// });
