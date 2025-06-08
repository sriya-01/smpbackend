import express from 'express';
import uploadSocial from '../../../middleware/uploadsocial.js';
import {
  createOrUpdateImage,
  getImage,
  deleteImage,
} from '../../../controllers/serviceController/socialMediaController/socialUserImageController.js';

const router = express.Router();

router.post('/', uploadSocial.single('image'), createOrUpdateImage);
router.get('/', getImage);
router.delete('/', deleteImage);

export default router;
