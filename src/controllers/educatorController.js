import Educator from "../models/educatorModel.js";
 
// Get existing data
export const getEducator = async (req, res) => {
  try {
    const data = await Educator.findOne(); // only one
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
 
// Create or update
export const updateEducator = async (req, res) => {
  try {
    const { heading, subheading } = req.body;
    let backgroundImage;
 
    if (req.file) {
      backgroundImage = `${req.protocol}://${req.get("host")}/uploads/educator/${req.file.filename}`;
    }
 
    let data = await Educator.findOne();
 
    if (data) {
      data.heading = heading;
      data.subheading = subheading;
      if (backgroundImage) data.backgroundImage = backgroundImage;
      await data.save();
    } else {
      data = await Educator.create({
        heading,
        subheading,
        backgroundImage: backgroundImage || "",
      });
    }
 
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
 
// Delete
export const deleteEducator = async (req, res) => {
  try {
    await Educator.deleteMany({});
    res.json({ message: "Educator content deleted." });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
 
 