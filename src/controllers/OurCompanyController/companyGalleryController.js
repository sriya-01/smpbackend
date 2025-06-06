import companyGallery from '../../models/OurCompanyModel/companyGalleryModel.js';

// Get current data (assuming only one document)
export const getGallery = async (req, res) => {
  const data = await companyGallery.findOne();
  res.json(data);
};

// Create
export const createGallery = async (req, res) => {
  const { heading, subheading } = req.body;
  const image = req.file?.filename;

  const data = new companyGallery({ heading, subheading, image });
  await data.save();
  res.json(data);
};

// Update
export const updateGallery = async (req, res) => {
  const { id } = req.params;
  const { heading, subheading } = req.body;

  const update = { heading, subheading };
  if (req.file) update.image = req.file.filename;

  const updated = await companyGallery.findByIdAndUpdate(id, update, { new: true });
  res.json(updated);
};

// Delete only the image field (not the whole record)
export const deleteGalleryImage = async (req, res) => {
  const { id } = req.params;
  const updated = await companyGallery.findByIdAndUpdate(id, { $unset: { image: "" } }, { new: true });
  res.json(updated);
};
