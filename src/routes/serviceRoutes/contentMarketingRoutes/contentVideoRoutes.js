
import express from 'express';
import {
  createOrUpdateVideo,
  getVideo,
  deleteVideo,
} from '../../../controllers/serviceController/contentMarketingController/contentMarketingVideoController.js';

const router = express.Router();

router.get('/', getVideo);
router.post('/', createOrUpdateVideo);
router.delete('/', deleteVideo);

export default router;
