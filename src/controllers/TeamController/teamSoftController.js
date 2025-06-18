import softBanner from '../../models/TeamModel/teamSoftBannerModel.js'
import fs from 'fs';

// Create
export const createCraft = async (req, res) => {
  try {
    const { heading, paragraphs } = req.body;
    const parsedParagraphs = Array.isArray(paragraphs)
      ? paragraphs
      : paragraphs ? [paragraphs] : [];

    const image = req.file?.path;

    const newCraft = await softBanner.create({ heading, paragraphs: parsedParagraphs, image });
    res.status(201).json(newCraft);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Read
export const getCraft = async (req, res) => {
  try {
    const craft = await softBanner.findOne().sort({ createdAt: -1 });
    res.json(craft);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update
export const updateCraft = async (req, res) => {
  try {
    const { id } = req.params;
    const { heading, paragraphs } = req.body;
    const parsedParagraphs = Array.isArray(paragraphs)
      ? paragraphs
      : paragraphs ? [paragraphs] : [];

    const image = req.file?.path;

    const existing = await softBanner.findById(id);
    if (!existing) return res.status(404).json({ error: 'Not found' });

    // Remove old image if new uploaded
    if (image && existing.image) {
      fs.unlinkSync(existing.image);
    }

    const updated = await softBanner.findByIdAndUpdate(
      id,
      {
        heading,
        paragraphs: parsedParagraphs,
        image: image || existing.image,
      },
      { new: true }
    );

    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete
export const deleteCraft = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await softBanner.findByIdAndDelete(id);
    if (deleted?.image) fs.unlinkSync(deleted.image);
    res.json({ message: 'Deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
