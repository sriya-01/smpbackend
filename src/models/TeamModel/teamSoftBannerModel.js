// models/CraftOrganic.js
import mongoose from 'mongoose';

const teamSoftBannerSchema = new mongoose.Schema(
  {
    heading: { type: String },
    paragraphs: [{ type: String }], // now supports multiple
    image: { type: String }, // File path
  },
  { timestamps: true }
);

export default mongoose.model('softBanner', teamSoftBannerSchema);
