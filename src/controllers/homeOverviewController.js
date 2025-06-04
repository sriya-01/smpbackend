import HomeOverview from '../models/homeOverviewModel.js';

// Get single overview (assuming only one document)
export const getOverview = async (req, res) => {
  const overview = await HomeOverview.findOne();
  res.json(overview);
};

// Create overview
export const createOverview = async (req, res) => {
  const { heading, subheading, content1, content2, content3, content4 } = req.body;
  const image = req.file?.filename;

  const overview = new HomeOverview({
    heading,
    subheading,
    content1,
    content2,
    content3,
    content4,
    image,
  });

  await overview.save();
  res.json(overview);
};

// Update overview
export const updateOverview = async (req, res) => {
  const { id } = req.params;
  const { heading, subheading, content1, content2, content3, content4 } = req.body;

  const updateData = {
    heading,
    subheading,
    content1,
    content2,
    content3,
    content4,
  };

  if (req.file) {
    updateData.image = req.file.filename;
  }

  const updated = await HomeOverview.findByIdAndUpdate(id, updateData, { new: true });
  res.json(updated);
};

// Delete specific field (like image or content1)
export const deleteOverviewField = async (req, res) => {
  const { id, field } = req.params;
  const update = { $unset: { [field]: "" } };
  const updated = await HomeOverview.findByIdAndUpdate(id, update, { new: true });
  res.json(updated);
};
