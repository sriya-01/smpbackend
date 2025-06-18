import mongoose from 'mongoose'

const softbannerSchema = new mongoose.Schema({
  heading: 
    { 
        type: String 
    },
  
     content:{
      type:String
    },
   
  image: 
    { 
        type: String
    }, 
   
}, { timestamps: true })

const TeamSoftBanner = mongoose.model('TeamSoftBanner', softbannerSchema)
export default TeamSoftBanner
