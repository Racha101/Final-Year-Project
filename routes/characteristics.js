const express = require("express");
const router = express.Router();
const {
  createCharacteristic,
  listCharacteristics
} = require("../controllers/characteristicController");

const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

router.post("/", authMiddleware, adminMiddleware, createCharacteristic); // POST /api/characteristics
router.get("/", listCharacteristics);   // GET /api/characteristics

module.exports = router;
