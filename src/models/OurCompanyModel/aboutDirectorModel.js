import mongoose from "mongoose"

const aboutDirectorSchema = new mongoose.Schema({
  heading: 
    { 
        type: String 
    },
  
     content1:{
      type:String
    },
    content2:{
      type:String
    },
  image: 
    { 
        type: String
    }, 
   
}, { timestamps: true })

const AboutDirector = mongoose.model('AboutDirector', aboutDirectorSchema)
export default AboutDirector
