import mongoose from 'mongoose'

const bannerSchema = new mongoose.Schema({
  heading: 
    { 
        type: String 
    },
  subheading: 
    {
         type: String
    },
  image: 
    { 
        type: String
    }, 
    logo1:{
      type:String
    },
    logo2:{
      type:String
    },
    logo3:{
      type:String
    },
    logo4:{
      type:String
    },
}, { timestamps: true })

const Banner = mongoose.model('Banner', bannerSchema)
export default Banner
