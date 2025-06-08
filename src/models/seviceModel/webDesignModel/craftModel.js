import mongoose from 'mongoose';

const craftSchema = new mongoose.Schema({
  heading: String,
  para1: String,
  para2: String,
  image: String, // File path
}, { timestamps: true });

export default mongoose.model('Craft', craftSchema);
