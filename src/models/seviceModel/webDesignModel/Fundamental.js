import mongoose from "mongoose";

const featureSchema = new mongoose.Schema({
  iconImage: { type: String, required: true },  // image path/url
  title: { type: String, required: true },
  description: { type: String, required: true },
});

const fundamentalsSchema = new mongoose.Schema({
  h2: { type: String, required: true },
  h6: { type: String, required: true },
  p: { type: String, required: true },
  features: [featureSchema],
}, { timestamps: true });
const Fundamentals = mongoose.model("Fundamentals", fundamentalsSchema);
export default Fundamentals;
