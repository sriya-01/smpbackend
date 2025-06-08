
import express from 'express';
import {
  createOrUpdateVideo,
  getVideo,
  deleteVideo,
} from '../../../controllers/serviceController/socialMediaController/socialVideoController.js';

const router = express.Router();

router.get('/', getVideo);
router.post('/', createOrUpdateVideo);
router.delete('/', deleteVideo);

export default router;
