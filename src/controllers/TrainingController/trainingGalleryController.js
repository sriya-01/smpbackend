// import TrainingGalleryHeading from "../../models/TrainingModel/trainingGalleryHeadingModel.js";
// import TrainingGalleryImage from "../../models/TrainingModel/trainingGalleryImagesModel.js";

// // ---------- HEADING CONTROLLERS ----------

// export const getHeading = async (req, res) => {
//   try {
//     const heading = await TrainingGalleryHeading.findOne();
//     res.json(heading);
//   } catch (error) {
//     res.status(500).json({ error: "Failed to fetch heading" });
//   }
// };

// export const saveOrUpdateHeading = async (req, res) => {
//   try {
//     const { heading, subheading } = req.body;
//     let existing = await TrainingGalleryHeading.findOne();

//     if (existing) {
//       existing.heading = heading;
//       existing.subheading = subheading;
//       await existing.save();
//       res.json(existing);
//     } else {
//       const newHead = new TrainingGalleryHeading({ heading, subheading });
//       await newHead.save();
//       res.json(newHead);
//     }
//   } catch (error) {
//     res.status(500).json({ error: "Failed to save heading" });
//   }
// };

// // ---------- IMAGE CONTROLLERS ----------

// export const getImages = async (req, res) => {
//   try {
//     const images = await TrainingGalleryImage.find();
//     res.json(images);
//   } catch (error) {
//     res.status(500).json({ error: "Failed to fetch images" });
//   }
// };

// export const uploadImages = async (req, res) => {
//   try {
//     const imageDocs = req.files.map(file => ({
//       image: file.filename
//     }));
//     const saved = await TrainingGalleryImage.insertMany(imageDocs);
//     res.json(saved);
//   } catch (error) {
//     res.status(500).json({ error: "Failed to upload images" });
//   }
// };

// export const deleteImage = async (req, res) => {
//   try {
//     await TrainingGalleryImage.findByIdAndDelete(req.params.id);
//     res.json({ success: true });
//   } catch (error) {
//     res.status(500).json({ error: "Failed to delete image" });
//   }
// };

import TrainingGalleryHeading from "../../models/TrainingModel/trainingGalleryHeadingModel.js";
import TrainingGalleryImage from "../../models/TrainingModel/trainingGalleryImagesModel.js";

// ---------- HEADING CONTROLLERS ----------

export const getHeading = async (req, res) => {
  const heading = await TrainingGalleryHeading.findOne();
  res.json(heading);
};

export const saveOrUpdateHeading = async (req, res) => {
  const { heading, subheading } = req.body;
  let existing = await TrainingGalleryHeading.findOne();

  if (existing) {
    existing.heading = heading;
    existing.subheading = subheading;
    await existing.save();
    res.json(existing);
  } else {
    const newHead = new TrainingGalleryHeading({ heading, subheading });
    await newHead.save();
    res.json(newHead);
  }
};

// ---------- IMAGE CONTROLLERS ----------

// Get all images
export const getImages = async (req, res) => {
  const images = await TrainingGalleryImage.find();
  res.json(images);
};

// Upload multiple images
export const uploadImages = async (req, res) => {
  // req.files is an array of uploaded files, each having filename by multer
  const imageDocs = req.files.map(file => ({
    image: file.filename
  }));

  const saved = await TrainingGalleryImage.insertMany(imageDocs);
  res.json(saved);
};

// Delete image by id
export const deleteImage = async (req, res) => {
  await TrainingGalleryImage.findByIdAndDelete(req.params.id);
  res.json({ success: true });
};
