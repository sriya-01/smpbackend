// import express from 'express';
// import {
//   createVideo,
//   getVideos,
//   updateVideo,
//   deleteVideo,
// } from '../../controllers/TrainingController/videoController.js';

// const router = express.Router();

// router.post('/', createVideo);
// router.get('/', getVideos);
// router.put('/:id', updateVideo);
// router.delete('/:id', deleteVideo);

// export default router;
import express from "express";
import upload from "../../middleware/upload.js";
import {
  createVideo,
  getVideos,
  updateVideo,
  deleteVideo
} from "../../controllers/TrainingController/videoController.js";

const router = express.Router();

router.post(
  "/",
  upload.fields([
    { name: "thumbnail", maxCount: 1 },
    { name: "videoFile", maxCount: 1 }
  ]),
  createVideo
);

router.get("/", getVideos);

router.put(
  "/:id",
  upload.fields([
    { name: "thumbnail", maxCount: 1 },
    { name: "videoFile", maxCount: 1 }
  ]),
  updateVideo
);

router.delete("/:id", deleteVideo);

export default router;
