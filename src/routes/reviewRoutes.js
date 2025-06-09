import { Router } from "express";
import {
  getReviewCard,
  updateHeadingSubheading,
  addImage,
  updateImage,
  deleteImage,
} from "../controllers/reviewController.js";
import upload from "../middleware/uploadReviewCard.js";
 
const router = Router();
 
router.get("/", getReviewCard);
router.put("/heading", updateHeadingSubheading);
router.post("/images", upload.single("image"), addImage);
router.put("/images/:imageId", upload.single("image"), updateImage);
router.delete("/images/:imageId", deleteImage);
 
export default router;
 
 