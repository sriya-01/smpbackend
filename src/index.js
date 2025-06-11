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
import teamSoftBannerRoutes from './routes/TeamRoutes/teamSoftBannerRoutes.js'
import teamCardRoutes from './routes/TeamRoutes/teamCardRoutes.js'
import teamGalleryRoutes from './routes/TeamRoutes/teamGalleryRoutes.js'
import aboutDirectorRoutes from './routes/OurCompanyRoutes/aboutDirectorRoutes.js'
import companyGalleryRoutes from './routes/OurCompanyRoutes/companyGalleryRoutes.js'
import trainingGalleryRoutes from './routes/Training/trainingGalleryRoutes.js'
import videoRoutes from './routes/Training/videoRoutes.js'
import allBannerRoutes from './routes/allBannerRoutes.js'
import imageRoutes from './routes/imageRoutes.js'
import educatorRoutes from './routes/educatorRoutes.js'
import marketingProofRoutes from './routes/ResourceRoutes/marketingProofRoutes.js'
import webVideoRoutes from './routes/serviceRoutes/webDesignRoutes/webVideoRoutes.js'
import organicVideoRoutes from "./routes/serviceRoutes/organicMarketingRoutes/organicVideoRoutes.js"
import organiccraftRoutes from "./routes/serviceRoutes/organicMarketingRoutes/organiccraftRoutes.js"
import googleVideoRoutes from "./routes/serviceRoutes/googleAdsRoutes/googleVideoRoutes.js"
import contentVideoRoutes from "./routes/serviceRoutes/contentMarketingRoutes/contentVideoRoutes.js"
import socialVideoRoutes from "./routes/serviceRoutes/socialMediaRoutes/socialVideoRoutes.js"
import socialUserImageRoutes from './routes/serviceRoutes/socialMediaRoutes/socialUserImageRoutes.js';
import craftSocialRoutes from "./routes/serviceRoutes/socialMediaRoutes/craftSocialRoutes.js"
import craftGoogleRoutes from "./routes/serviceRoutes/googleAdsRoutes/craftGoogleRoutes.js"
import craftContentRoutes from "./routes/serviceRoutes/contentMarketingRoutes/craftContentRoutes.js"
import craftRoutes from './routes/serviceRoutes/webDesignRoutes/craftRoutes.js';
import authRoutes from './routes/authRoutes.js'
import protectedRoutes from './routes/protectedRoutes.js'
import reviewRoutes from './routes/reviewRoutes.js'
import formComponentRoutes from './routes/formComponentRoutes.js'

dotenv.config()
const app = express()

// Middleware
app.use(cors())
app.use(express.json())
app.use('/uploads', express.static('uploads'))

// for frontend connection
// app.use(cors({
//   origin: ['https://safarimarketingpro.netlify.app/'], 
//   credentials: true 
// }));

app.use(cors({
  origin: 'https://safari-marketing-pro.netlify.app', 
  methods: ['POST'],
}));


// Routes
app.use('/api/banner', bannerRoutes)
app.use("/api/content", contentRoutes);
app.use("/api/home-overview", homeOverviewRoutes);
app.use("/api/team-soft-banner",teamSoftBannerRoutes);
app.use("/api/team-card",teamCardRoutes);
app.use("/api/team-gallery",teamGalleryRoutes);
app.use("/api/about-director",aboutDirectorRoutes);
app.use("/api/company-gallery",companyGalleryRoutes);
app.use("/api/training-gallery",trainingGalleryRoutes);
app.use('/api/videos', videoRoutes);
app.use('/api/all-banners', allBannerRoutes);
app.use('/api/images',imageRoutes);
app.use('/api/educator',educatorRoutes);
app.use('/api/marketing-proof',marketingProofRoutes);
app.use('/api/webvideo',webVideoRoutes)
app.use('/api/organicvideo', organicVideoRoutes);       
app.use('/api/organicCraft', organiccraftRoutes);
app.use('/api/googlevideo', googleVideoRoutes);       
app.use('/api/socialvideo', socialVideoRoutes);       
app.use('/api/contentvideo', contentVideoRoutes);       
app.use('/api/socialImage', socialUserImageRoutes);
app.use('/api/socialCraft', craftSocialRoutes);
app.use('/api/contentCraft', craftContentRoutes);
app.use('/api/googleCraft', craftGoogleRoutes);
app.use('/api/craft', craftRoutes);
app.use('/api/auth', authRoutes);
app.use('/api', protectedRoutes);
app.use('/api/review-card', reviewRoutes);
app.use('/api/form-contact', formComponentRoutes);


// DB and Server Start
connectDB()
const PORT = process.env.PORT || 8000
app.listen(PORT, () => console.log(`Server running on ${PORT}`))


