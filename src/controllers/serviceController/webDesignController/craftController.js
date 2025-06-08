import Craft from '../../../models/seviceModel/webDesignModel/craftModel.js';
import fs from 'fs';

export const createCraft = async (req, res) => {
  try {
    const { heading, para1, para2 } = req.body;
    const image = req.file?.path;

    const newCraft = await Craft.create({ heading, para1, para2, image });
    res.status(201).json(newCraft);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getCraft = async (req, res) => {
  try {
    const craft = await Craft.findOne().sort({ createdAt: -1 });
    res.json(craft);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateCraft = async (req, res) => {
  try {
    const { id } = req.params;
    const { heading, para1, para2 } = req.body;
    const image = req.file?.path;

    const existing = await Craft.findById(id);
    if (!existing) return res.status(404).json({ error: 'Not found' });

    // Remove old image if a new one is uploaded
    if (image && existing.image) {
      fs.unlinkSync(existing.image);
    }

    const updated = await Craft.findByIdAndUpdate(
      id,
      { heading, para1, para2, image: image || existing.image },
      { new: true }
    );

    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteCraft = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Craft.findByIdAndDelete(id);
    if (deleted?.image) fs.unlinkSync(deleted.image);
    res.json({ message: 'Deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
