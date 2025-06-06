import mongoose from "mongoose";

const headingSchema = new mongoose.Schema({
  heading: { type: String, required: true },
  subheading: { type: String, required: true }
});

export default mongoose.model("TrainingGalleryHeading", headingSchema);
