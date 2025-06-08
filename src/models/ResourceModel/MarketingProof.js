import mongoose from "mongoose";
 
const ImageSchema = new mongoose.Schema({
  url: { type: String, required: true },   // image file path on server
  title: { type: String, default: "" },    // optional title
});
 
const MarketingProofSchema = new mongoose.Schema({
  heading: { type: String, default: "" },
  subheading: { type: String, default: "" },
  images: [ImageSchema],
});
 
export default mongoose.model("MarketingProof", MarketingProofSchema);
 
 