// import dotenv from "dotenv"
// import connectDB from "./db/index.js";
// import { app } from "./app.js";



// dotenv.config({
//     path:'./env'
// })


// connectDB()
// .then (() =>{
//     app.listen(process.env.PORT || 8000, () =>{
//         console.log(`Server is running at port: ${process.env.PORT}`);
//     } )
// })
// .catch((err) =>{
//     console.log("Mongo DB connection Faild !!!",err)
// })

import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import bannerRoutes from './routes/bannerRoutes.js'
import contentRoutes from "./routes/content.js";
import connectDB from './db/index.js'
import homeOverviewRoutes from './routes/homeOverviewRoutes.js'

dotenv.config()
const app = express()

// Middleware
app.use(cors())
app.use(express.json())
app.use('/uploads', express.static('uploads'))




// Routes
app.use('/api/banner', bannerRoutes)
app.use("/api/content", contentRoutes);
app.use("/api/home-overview", homeOverviewRoutes)

// DB and Server Start
connectDB()
const PORT = process.env.PORT || 8000
app.listen(PORT, () => console.log(`Server running on ${PORT}`))


