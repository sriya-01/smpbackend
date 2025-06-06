import TeamMember from '../../models/TeamModel/teamCardModel.js'

// Get all team members
export const getAllTeamMembers = async (req, res) => {
  try {
    const members = await TeamMember.find();
    res.json(members);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Create a new member
export const createTeamMember = async (req, res) => {
  try {
    const { name, role } = req.body;
    const image = req.file ? req.file.path : '';
    const newMember = new TeamMember({ name, role, image });
    await newMember.save();
    res.status(201).json(newMember);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a member
export const updateTeamMember = async (req, res) => {
  try {
    const { name, role } = req.body;
    const image = req.file ? req.file.path : undefined;

    const updateData = { name, role };
    if (image) updateData.image = image;

    const updated = await TeamMember.findByIdAndUpdate(req.params.id, updateData, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete a member
export const deleteTeamMember = async (req, res) => {
  try {
    await TeamMember.findByIdAndDelete(req.params.id);
    res.json({ message: "Member deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

