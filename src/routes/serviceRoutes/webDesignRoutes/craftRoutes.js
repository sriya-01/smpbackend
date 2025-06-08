import express from 'express';
import multer from 'multer';
import {
  createCraft,
  getCraft,
  updateCraft,
  deleteCraft,
} from '../../../controllers/serviceController/webDesignController/craftController.js';

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname),
});

const upload = multer({ storage });

router.get('/', getCraft);
router.post('/', upload.single('image'), createCraft);
router.put('/:id', upload.single('image'), updateCraft);
router.delete('/:id', deleteCraft);

export default router;
