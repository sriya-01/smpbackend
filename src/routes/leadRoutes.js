import express from "express";
import { createLead } from "../services/odooService.js";

const router = express.Router();

router.post("/submitlead", async (req, res) => {
  const { name, email, phone, message } = req.body;

  try {
    const leadId = await createLead({ name, email, phone, message });
    res.status(200).json({ message: "Lead created successfully!", lead_id: leadId });
  } catch (error) {
    console.error("Error creating lead:", error);
    res.status(500).json({ message: "Failed to create lead" });
  }
});

export default router;
