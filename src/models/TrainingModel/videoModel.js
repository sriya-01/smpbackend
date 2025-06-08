import mongoose from "mongoose";

const videoSchema = new mongoose.Schema({
  title: String,
  thumbnail: String,
  videoFile: String,
});

export default mongoose.model("Video", videoSchema);
