import { Router } from "express";
import {
  getMarketingProof,
  updateHeadingSubheading,
  addImage,
  updateImage,
  deleteImage,
} from "../../controllers/ResourceController/marketingProofController.js";
import upload from "../../middleware/uploadResourse.js";
 
const router = Router();
 
// Use the imported functions directly as route handlers:
router.get("/", getMarketingProof);
router.put("/heading", updateHeadingSubheading);
router.post("/images", upload.single("image"), addImage);
router.put("/images/:imageId", upload.single("image"), updateImage);
router.delete("/images/:imageId", deleteImage);
 
export default router;
 
 