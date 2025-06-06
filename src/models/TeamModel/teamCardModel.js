
import mongoose from 'mongoose'

const TeamMemberSchema = new mongoose.Schema({
  name: 
    { 
        type: String 
    },
  
     role:{
      type:String
    },
  image: 
    { 
        type: String
    }, 
   
}, { timestamps: true })

const TeamMember = mongoose.model('TeamMember', TeamMemberSchema)
export default TeamMember