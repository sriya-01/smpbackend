// import express from "express";
// import multer from "multer";
// import {
//   getHeading,
//   saveOrUpdateHeading,
//   getImages,
//   uploadImages,
//   deleteImage,
// } from "../../controllers/TrainingController/trainingGalleryController.js";

// const router = express.Router();

// // Upload Config
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => cb(null, "uploads/training/"),
//   filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
// });
// const upload = multer({ storage });

// // ---------- HEADING ROUTES ----------
// router.get("/heading", getHeading);
// router.post("/heading", saveOrUpdateHeading);

// // ---------- IMAGE ROUTES ----------
// router.get("/images", getImages);
// router.post("/images", upload.array("images", 10), uploadImages);
// router.delete("/images/:id", deleteImage);

// export default router;

import express from "express";
import multer from "multer";
import { getHeading, saveOrUpdateHeading, getImages, uploadImages, deleteImage } from "../../controllers/TrainingController/trainingGalleryController.js";

const router = express.Router();

const storage = multer.diskStorage({
  destination: "uploads/training", // folder to save files, create it beforehand
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + file.originalname.match(/\..*$/)[0]);
  }
});
const upload = multer({ storage });

router.get("/heading", getHeading);
router.post("/heading", saveOrUpdateHeading);

router.get("/images", getImages);
router.post("/images", upload.array("images", 10), uploadImages);
router.delete("/images/:id", deleteImage);

export default router;
