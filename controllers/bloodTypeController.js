const BloodType = require("../models/BloodType");

// POST /api/bloodtypes
const createBloodType = async (req, res) => {
  try {
    const { type } = req.body;
    if (!type) return res.status(400).json({ msg: "Blood type is required" });

    const existing = await BloodType.findOne({ type });
    if (existing) return res.status(400).json({ msg: "Blood type already exists" });

    const bt = new BloodType({ type });
    await bt.save();
    res.json(bt);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Failed to create blood type" });
  }
};

// GET /api/bloodtypes
const listBloodTypes = async (req, res) => {
  try {
    const types = await BloodType.find().sort({ type: 1 });
    res.json(types);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Failed to fetch blood types" });
  }
};

// DELETE /api/bloodtypes/:id
const deleteBloodType = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await BloodType.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ msg: "Blood type not found" });
    res.json({ msg: "Blood type deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Failed to delete blood type" });
  }
};

module.exports = { createBloodType, listBloodTypes, deleteBloodType };
