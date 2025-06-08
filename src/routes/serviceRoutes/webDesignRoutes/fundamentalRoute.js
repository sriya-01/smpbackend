
// export default router;
import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";

import {
  getFundamentals,
  createFundamentals,
  updateFundamentals,
  deleteFundamentals,
} from "../../../controllers/serviceController/webDesignController/fundamentalsController.js";

const router = express.Router();

// Setup multer storage for icon uploads
const uploadDir = "uploads/icons";
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${Date.now()}${ext}`);
  },
});
const upload = multer({ storage });

// Upload icon image route
router.post("/upload-icon", upload.single("iconImage"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }
  // Respond with the image path so frontend can save it
  res.json({ path: `/${uploadDir}/${req.file.filename}` });
});

router.get("/", getFundamentals);
router.post("/", createFundamentals);
router.put("/:id", updateFundamentals);
router.delete("/:id", deleteFundamentals);

export default router;
