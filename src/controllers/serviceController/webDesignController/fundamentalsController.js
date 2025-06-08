import Fundamentals from "../../../models/seviceModel/webDesignModel/Fundamental.js";

// Get fundamentals (assuming only one document)
export const getFundamentals = async (req, res) => {
  try {
    const data = await Fundamentals.findOne();
    if (!data) return res.status(404).json({ message: "Fundamentals not found" });
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create fundamentals (for initial creation or if none exists)
export const createFundamentals = async (req, res) => {
  try {
    const newFundamentals = new Fundamentals(req.body);
    await newFundamentals.save();
    res.status(201).json(newFundamentals);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update fundamentals by ID
export const updateFundamentals = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await Fundamentals.findByIdAndUpdate(id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: "Fundamentals not found" });
    res.json(updated);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete fundamentals by ID
export const deleteFundamentals = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Fundamentals.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ message: "Fundamentals not found" });
    res.json({ message: "Fundamentals deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
