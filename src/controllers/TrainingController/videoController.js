// import Video from '../../models/TrainingModel/videoModel.js';

// // CREATE
// export const createVideo = async (req, res) => {
//   try {
//     const { title, thumbnail, videoUrl } = req.body;
//     const video = new Video({ title, thumbnail, videoUrl });
//     await video.save();
//     res.status(201).json(video);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// // READ
// export const getVideos = async (req, res) => {
//   try {
//     const videos = await Video.find();
//     res.json(videos);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// // UPDATE
// export const updateVideo = async (req, res) => {
//   try {
//     const video = await Video.findByIdAndUpdate(req.params.id, req.body, { new: true });
//     res.json(video);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// // DELETE
// export const deleteVideo = async (req, res) => {
//   try {
//     await Video.findByIdAndDelete(req.params.id);
//     res.json({ message: 'Deleted successfully' });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

import Video from "../../models/TrainingModel/videoModel.js";

export const createVideo = async (req, res) => {
  try {
    const { title } = req.body;
    const thumbnail = req.files?.thumbnail?.[0]?.path;
    const videoFile = req.files?.videoFile?.[0]?.path;

    const newVideo = new Video({ title, thumbnail, videoFile });
    await newVideo.save();
    res.status(201).json(newVideo);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getVideos = async (req, res) => {
  try {
    const videos = await Video.find().sort({ _id: -1 });
    res.json(videos);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateVideo = async (req, res) => {
  try {
    const updates = req.body;

    if (req.files?.thumbnail?.[0]) {
      updates.thumbnail = req.files.thumbnail[0].path;
    }
    if (req.files?.videoFile?.[0]) {
      updates.videoFile = req.files.videoFile[0].path;
    }

    const updatedVideo = await Video.findByIdAndUpdate(req.params.id, updates, { new: true });
    res.json(updatedVideo);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteVideo = async (req, res) => {
  try {
    await Video.findByIdAndDelete(req.params.id);
    res.json({ message: "Video deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
