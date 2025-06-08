import express from "express";
import upload from "../middleware/uploadEducatorImage.js";
import {
  getEducator,
  updateEducator,
  deleteEducator,
} from "../controllers/educatorController.js";
 
const router = express.Router();
 
router.get("/", getEducator);
router.post("/", upload.single("backgroundImage"), updateEducator);
router.delete("/", deleteEducator);
 
export default router;
 