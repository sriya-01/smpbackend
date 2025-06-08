import Image from '../models/Image.js';
import fs from 'fs';
import path from 'path';
 
// Get all images
export const getAllImages = async (req, res) => {
  try {
    const images = await Image.find().sort({ createdAt: 1 });
    res.json(images);
  } catch (error) {
    res.status(500).json({ message: 'Failed to get images' });
  }
};
 
// Upload new image
export const uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }
    const newImage = new Image({
      src: `/uploads/${req.file.filename}`, // relative path to serve
      alt: req.body.alt || '',
    });
    await newImage.save();
    res.status(201).json(newImage);
  } catch (error) {
    res.status(500).json({ message: 'Failed to upload image' });
  }
};
 
// Delete image by id
export const deleteImage = async (req, res) => {
  try {
    const image = await Image.findById(req.params.id);
    if (!image) return res.status(404).json({ message: 'Image not found' });
 
    // Delete file from disk
    const filePath = path.join(process.cwd(), image.src);
    fs.unlink(filePath, (err) => {
      if (err) console.error('Failed to delete file:', err);
    });
 
    await image.deleteOne();
    res.json({ message: 'Image deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete image' });
  }
};
 
// Update image alt text by id (optional edit)
export const updateImage = async (req, res) => {
  try {
    const { alt } = req.body;
    const image = await Image.findById(req.params.id);
    if (!image) return res.status(404).json({ message: 'Image not found' });
 
    image.alt = alt || image.alt;
    await image.save();
    res.json(image);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update image' });
  }
};
 
 