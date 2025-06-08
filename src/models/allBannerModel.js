import mongoose from 'mongoose';

const allBannerSchema = new mongoose.Schema({
  pageKey: { type: String, required: true, unique: true }, // e.g. "team", "ourclient"
  title: { type: String, required: true },
  description: { type: String },
  imageUrl: { type: String }, // Store filename/path to uploaded image
}, { timestamps: true });

export default mongoose.model('AllBanner', allBannerSchema);
