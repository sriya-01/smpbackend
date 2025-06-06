import express from 'express';
import multer from 'multer';
import {
  getAllTeamMembers,
  createTeamMember,
  updateTeamMember,
  deleteTeamMember
} from '../../controllers/TeamController/teamCardController.js';

const router = express.Router();

// Multer config
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname),
});
const upload = multer({ storage });

// Routes
router.get('/', getAllTeamMembers);
router.post('/', upload.single('image'), createTeamMember);
router.put('/:id', upload.single('image'), updateTeamMember);
router.delete('/:id', deleteTeamMember);


export default router;
