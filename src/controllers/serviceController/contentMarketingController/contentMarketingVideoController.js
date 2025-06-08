
import ContentVideo from '../../../models/seviceModel/contentMarketingModel/contentVideoModel.js';

export const createOrUpdateVideo = async (req, res) => {
  try {
    const { videoUrl } = req.body;

    // Check if video exists, update it; else create
    let video = await ContentVideo.findOne();
    if (video) {
      video.videoUrl = videoUrl;
      await video.save();
    } else {
      video = await ContentVideo.create({ videoUrl });
    }

    res.status(200).json(video);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getVideo = async (req, res) => {
  try {
    const video = await ContentVideo.findOne();
    res.status(200).json(video);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteVideo = async (req, res) => {
  try {
    await ContentVideo.deleteOne({});
    res.status(200).json({ message: 'Video deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
