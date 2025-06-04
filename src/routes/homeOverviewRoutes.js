import express from 'express';
import multer from 'multer';
import {
  getOverview,
  createOverview,
  updateOverview,
  deleteOverviewField,
} from '../controllers/homeOverviewController.js';

const router = express.Router();

// Multer config
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname),
});
const upload = multer({ storage });

// Routes
router.get('/', getOverview);
router.post('/', upload.single('image'), createOverview);
router.put('/:id', upload.single('image'), updateOverview);
router.patch('/:id/delete/:field', deleteOverviewField);

export default router;
