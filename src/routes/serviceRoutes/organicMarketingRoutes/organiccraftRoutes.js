import express from 'express';
import multer from 'multer';
import {
  createCraft,
  getCraft,
  updateCraft,
  deleteCraft,
} from '../../../controllers/serviceController/organicMarketingController/craftOrganicController.js';

const router = express.Router();

// Set up multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/craft'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname),
});

const upload = multer({ storage });

// Routes
router.get('/', getCraft);
router.post('/', upload.single('image'), createCraft);
router.put('/:id', upload.single('image'), updateCraft);
router.delete('/:id', deleteCraft);

export default router;
