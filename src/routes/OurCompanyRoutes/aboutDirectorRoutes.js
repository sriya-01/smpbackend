import express from 'express';
import multer from 'multer';
import {
  getAboutDirector,
  createAboutDirector,
  updateAboutDirector,
  deleteAboutDirector
} from '../../controllers/OurCompanyController/aboutDirectorController.js';

const router = express.Router();

// Multer config
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname),
});
const upload = multer({ storage });

// Routes
router.get('/', getAboutDirector);
router.post('/', upload.single('image'), createAboutDirector);
router.put('/:id', upload.single('image'), updateAboutDirector);
router.delete('/:id', deleteAboutDirector);

export default router;
