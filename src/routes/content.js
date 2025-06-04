import express from "express";
import multer from "multer";
import Content from "../models/Content.js";
import fs from "fs";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

// GET content
router.get("/:page/:subpage", async (req, res) => {
  const { page, subpage } = req.params;
  const content = await Content.findOne({ page, subpage });
  res.json(content);
});

// POST new content
router.post("/:page/:subpage", upload.any(), async (req, res) => {
  const fields = req.body;
  const images = {};
  req.files.forEach(file => images[file.fieldname] = file.filename);

  const content = new Content({ page: req.params.page, subpage: req.params.subpage, fields, images });
  await content.save();
  res.json(content);
});

// PUT update
router.put("/:page/:subpage/:id", upload.any(), async (req, res) => {
  const fields = req.body;
  const images = {};
  req.files.forEach(file => images[file.fieldname] = file.filename);

  const updated = await Content.findByIdAndUpdate(
    req.params.id,
    { fields, images },
    { new: true }
  );
  res.json(updated);
});

// DELETE
router.delete("/:page/:subpage/:id", async (req, res) => {
  const deleted = await Content.findByIdAndDelete(req.params.id);
  res.json(deleted);
});

export default router;
