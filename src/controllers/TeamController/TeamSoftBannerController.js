import TeamSoftBanner from '../../models/TeamModel/SoftTeamBannerModel.js';


// Get single overview (assuming only one document)
export const getTeamSoftBanner = async (req, res) => {
  const overview = await TeamSoftBanner.findOne();
  res.json(overview);
};

// Create overview
export const createTeamSoftBanner= async (req, res) => {
  const { heading, content } = req.body;
  const image = req.file?.filename;

  const overview = new TeamSoftBanner({
    heading,
   
    content,
    image,
  });

  await overview.save();
  res.json(overview);
};

// Update overview
export const updateTeamSoftBanner= async (req, res) => {
  const { id } = req.params;
  const { heading,  content } = req.body;

  const updateData = {
    heading,
    
    content,
  };

  if (req.file) {
    updateData.image = req.file.filename;
  }

  const updated = await TeamSoftBanner.findByIdAndUpdate(id, updateData, { new: true });
  res.json(updated);
};

// Delete specific field (like image or content1)
export const deleteTeamSoftBanner = async (req, res) => {
  const { id, field } = req.params;
  const update = { $unset: { [field]: "" } };
  const updated = await TeamSoftBanner.findByIdAndUpdate(id, update, { new: true });
  res.json(updated);
};
