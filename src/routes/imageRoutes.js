import express from 'express';
import upload from '../middleware/imageUpload.js';
import {
  getAllImages,
  uploadImage,
  deleteImage,
  updateImage,
} from '../controllers/imageController.js';
 
const router = express.Router();
 
router.get('/', getAllImages);
router.post('/', upload.single('image'), uploadImage);
router.delete('/:id', deleteImage);
router.put('/:id', updateImage);
 
export default router;