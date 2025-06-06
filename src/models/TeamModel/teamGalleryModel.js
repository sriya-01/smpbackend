import mongoose from 'mongoose';

const TeamGallerySchema = new mongoose.Schema({
  heading: 
    { 
        type: String 
    },
  
  subheading:{
      type:String
    },
  image: 
    { 
        type: String
    }, 
}, { timestamps: true });

const TeamGallery = mongoose.model('TeamGallery', TeamGallerySchema)
export default TeamGallery
