import SocialImage from '../../../models/seviceModel/socialMediaModel/socialUserImageModel.js';
export const createOrUpdateImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No image file uploaded' });
    }

    const imagePath = req.file.path; // like 'uploads/123456789-image.jpg'

    // Check if image document exists
    let imageDoc = await SocialImage.findOne();

    if (imageDoc) {
      imageDoc.image = imagePath;
      await imageDoc.save();
    } else {
      imageDoc = await SocialImage.create({ image: imagePath });
    }

    res.status(200).json(imageDoc);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getImage = async (req, res) => {
  try {
    const imageDoc = await SocialImage.findOne();
    res.status(200).json(imageDoc);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteImage = async (req, res) => {
  try {
    await SocialImage.deleteOne({});
    res.status(200).json({ message: 'Image deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};