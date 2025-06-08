
import GoogleVideo from '../../../models/seviceModel/googleAdsModel/googleVideoModel.js';

export const createOrUpdateVideo = async (req, res) => {
  try {
    const { videoUrl } = req.body;

    // Check if video exists, update it; else create
    let video = await GoogleVideo.findOne();
    if (video) {
      video.videoUrl = videoUrl;
      await video.save();
    } else {
      video = await GoogleVideo.create({ videoUrl });
    }

    res.status(200).json(video);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getVideo = async (req, res) => {
  try {
    const video = await GoogleVideo.findOne();
    res.status(200).json(video);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteVideo = async (req, res) => {
  try {
    await GoogleVideo.deleteOne({});
    res.status(200).json({ message: 'Video deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
