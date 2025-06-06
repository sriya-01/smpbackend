import express from 'express';
import multer from 'multer';
import {
  getTeamSoftBanner,
  createTeamSoftBanner,
  updateTeamSoftBanner,
  deleteTeamSoftBanner,
} from '../../controllers/TeamController/TeamSoftBannerController.js';

const router = express.Router();

// Multer config
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname),
});
const upload = multer({ storage });

// Routes
router.get('/', getTeamSoftBanner);
router.post('/', upload.single('image'), createTeamSoftBanner);
router.put('/:id', upload.single('image'), updateTeamSoftBanner);
router.patch('/:id/delete/:field', deleteTeamSoftBanner);

export default router;
