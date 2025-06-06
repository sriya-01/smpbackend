import express from 'express';
import multer from 'multer';
import {
  getGallery,
  createGallery,
  updateGallery,
  deleteGalleryImage
} from '../../controllers/OurCompanyController/companyGalleryController.js';

const router = express.Router();

// Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname),
});
const upload = multer({ storage });

// Routes
router.get('/', getGallery);
router.post('/', upload.single('image'), createGallery);
router.put('/:id', upload.single('image'), updateGallery);
router.patch('/:id/image', deleteGalleryImage); // remove only image

export default router;
