import express from 'express';
import { getAllBanners, getBanner, createOrUpdateBanner, deleteBanner } from '../controllers/allBannerController.js';
import { upload } from '../middleware/bannerupload.js';

const router = express.Router();

router.get('/', getAllBanners);
router.get('/:pageKey', getBanner);
router.post('/', upload.single('image'), createOrUpdateBanner);
router.delete('/:pageKey', deleteBanner);

export default router;
