import mongoose from 'mongoose';

const companyGallerySchema = new mongoose.Schema({
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

const companyGallery = mongoose.model('companyGallery', companyGallerySchema)
export default companyGallery