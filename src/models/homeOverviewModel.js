import mongoose from 'mongoose'

const overviewSchema = new mongoose.Schema({
  heading: 
    { 
        type: String 
    },
  subheading: 
    {
         type: String
    },
     content1:{
      type:String
    },
    content2:{
      type:String
    },
    content3:{
      type:String
    },
    content4:{
      type:String
    },
  image: 
    { 
        type: String
    }, 
   
}, { timestamps: true })

const HomeOverview = mongoose.model('HomeOverview', overviewSchema)
export default HomeOverview
