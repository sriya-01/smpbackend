// import WebVideo from '../../../models/seviceModel/webDesignModel/webVideoModel.js';
// import fs from 'fs';

// export const uploadVideo = async (req, res) => {
//   try {
//     const videoPath = req.file?.path;
//     const newVideo = await WebVideo.create({ videoPath });
//     res.status(201).json(newVideo);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// export const getVideo = async (req, res) => {
//   try {
//     const video = await WebVideo.findOne().sort({ createdAt: -1 }); // latest
//     res.json(video);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// export const deleteVideo = async (req, res) => {
//   try {
//     const video = await WebVideo.findByIdAndDelete(req.params.id);
//     if (video?.videoPath) fs.unlinkSync(video.videoPath);
//     res.json({ message: 'Video deleted successfully' });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };
import OrganicVideo from '../../../models/seviceModel/organicMarketingModel/organicVideoModel.js';

export const createOrUpdateVideo = async (req, res) => {
  try {
    const { videoUrl } = req.body;

    // Check if video exists, update it; else create
    let video = await OrganicVideo.findOne();
    if (video) {
      video.videoUrl = videoUrl;
      await video.save();
    } else {
      video = await OrganicVideo.create({ videoUrl });
    }

    res.status(200).json(video);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getVideo = async (req, res) => {
  try {
    const video = await OrganicVideo.findOne();
    res.status(200).json(video);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteVideo = async (req, res) => {
  try {
    await OrganicVideo.deleteOne({});
    res.status(200).json({ message: 'Video deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
