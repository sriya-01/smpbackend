import mongoose from 'mongoose';
 
const imageSchema = new mongoose.Schema({
  src: { type: String, required: true }, // path or filename saved on server
  alt: { type: String, default: '' },    // optional alt text
  createdAt: { type: Date, default: Date.now }
});
 
const Image = mongoose.model('Image', imageSchema);
export default Image;
 