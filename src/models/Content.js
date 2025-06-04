import mongoose from "mongoose";

const contentSchema = new mongoose.Schema({
  page: String,
  subpage: String,
  fields: mongoose.Schema.Types.Mixed,
  images: mongoose.Schema.Types.Mixed,
});

export default mongoose.model("Content", contentSchema);
