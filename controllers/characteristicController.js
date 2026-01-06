const Characteristic = require("../models/Characteristic");

// CREATE characteristic
// POST /api/characteristics
const createCharacteristic = async (req, res) => {
  try {
    const { name, type, handler_type, handler_value } = req.body;

    if (!name || !type || !handler_type || handler_value === undefined) {
      return res.status(400).json({ msg: "All fields are required" });
    }

    const characteristic = new Characteristic({
      name,
      type,
      handler_type,
      handler_value
    });

    await characteristic.save();
    res.json(characteristic);
  } catch (err) {
    console.error("CREATE CHARACTERISTIC ERROR:", err);
    res.status(500).json({ msg: "Failed to create characteristic" });
  }
};

// LIST characteristics
// GET /api/characteristics
const listCharacteristics = async (req, res) => {
  try {
    const list = await Characteristic.find().sort({ createdAt: 1 });
    res.json(list);
  } catch (err) {
    console.error("LIST CHARACTERISTICS ERROR:", err);
    res.status(500).json({ msg: "Failed to fetch characteristics" });
  }
};

module.exports = { createCharacteristic, listCharacteristics };
