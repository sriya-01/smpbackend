// models/educatorModel.js
import mongoose from "mongoose";
 
const educatorSchema = new mongoose.Schema({
  heading: { type: String, required: true },
  subheading: { type: String, required: true },
  backgroundImage: { type: String, required: true }, // store URL
});
 
const Educator = mongoose.model("Educator", educatorSchema);
export default Educator;
 
 