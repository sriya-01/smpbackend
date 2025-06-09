import ReviewCard from "../models/reviewModel.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
 
// __dirname workaround for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
 
// Helper to delete image file
const deleteImageFile = (filePath) => {
  fs.unlink(filePath, (err) => {
    if (err) console.error("Failed to delete image file:", err);
  });
};
 
// GET: Get review card data
const getReviewCard = async (req, res) => {
  try {
    let doc = await ReviewCard.findOne();
    if (!doc) {
      doc = new ReviewCard();
      await doc.save();
    }
    res.json(doc);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
 
// PUT: Update heading and subheading
const updateHeadingSubheading = async (req, res) => {
  try {
    const { heading, subheading } = req.body;
    let doc = await ReviewCard.findOne();
    if (!doc) doc = new ReviewCard();
 
    if (heading !== undefined) doc.heading = heading;
    if (subheading !== undefined) doc.subheading = subheading;
 
    await doc.save();
    res.json(doc);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
 
// POST: Add new image
const addImage = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: "Image file is required" });
 
    const imageUrl = "/uploads/" + req.file.filename;
    const title = req.body.title || "";
 
    let doc = await ReviewCard.findOne();
    if (!doc) doc = new ReviewCard();
 
    doc.images.push({ url: imageUrl, title });
    await doc.save();
 
    res.json(doc);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
 
// PUT: Update image title or file
const updateImage = async (req, res) => {
  try {
    const { imageId } = req.params;
    let doc = await ReviewCard.findOne();
    if (!doc) return res.status(404).json({ error: "Document not found" });
 
    const image = doc.images.id(imageId);
    if (!image) return res.status(404).json({ error: "Image not found" });
 
    if (req.body.title !== undefined) {
      image.title = req.body.title;
    }
 
    if (req.file) {
      const oldFilePath = path.join(__dirname, "..", image.url);
      deleteImageFile(oldFilePath);
      image.url = "/uploads/" + req.file.filename;
    }
 
    await doc.save();
    res.json(doc);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
 
// DELETE: Remove image by ID
const deleteImage = async (req, res) => {
  try {
    const { imageId } = req.params;
    let doc = await ReviewCard.findOne();
    if (!doc) return res.status(404).json({ error: "Document not found" });
 
    const image = doc.images.find((img) => img._id.toString() === imageId);
    if (!image) return res.status(404).json({ error: "Image not found" });
 
    const filePath = path.join(__dirname, "..", image.url);
    deleteImageFile(filePath);
 
    doc.images = doc.images.filter((img) => img._id.toString() !== imageId);
    await doc.save();
 
    res.json(doc);
  } catch (err) {
    console.error("Error in deleteImage:", err);
    res.status(500).json({ error: err.message });
  }
};
 
export {
  getReviewCard,
  updateHeadingSubheading,
  addImage,
  updateImage,
  deleteImage,
};
 
 