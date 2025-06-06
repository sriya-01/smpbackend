import AboutDirector from '../../models/OurCompanyModel/aboutDirectorModel.js';

// GET all entries (or first if only one)
export const getAboutDirector = async (req, res) => {
  const data = await AboutDirector.find();
  res.json(data);
};

// CREATE
export const createAboutDirector = async (req, res) => {
  const { heading, content1, content2 } = req.body;
  const image = req.file?.filename;

  const entry = new AboutDirector({ heading, content1, content2, image });
  await entry.save();
  res.json(entry);
};

// UPDATE
export const updateAboutDirector = async (req, res) => {
  const { id } = req.params;
  const { heading, content1, content2 } = req.body;
  const update = { heading, content1, content2 };

  if (req.file) update.image = req.file.filename;

  const updated = await AboutDirector.findByIdAndUpdate(id, update, { new: true });
  res.json(updated);
};

// DELETE
export const deleteAboutDirector = async (req, res) => {
  const { id } = req.params;
  await AboutDirector.findByIdAndDelete(id);
  res.json({ message: "Deleted successfully" });
};
