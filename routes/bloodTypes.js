
console.log("✅ bloodTypes routes file loaded");

const express = require("express");
const router = express.Router();
const {
  createBloodType,
  listBloodTypes,
  deleteBloodType
} = require("../controllers/bloodTypeController");

const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

router.post("/", authMiddleware, adminMiddleware, createBloodType);
router.delete("/:id", authMiddleware, adminMiddleware, deleteBloodType);
router.get("/", listBloodTypes);        // GET /api/bloodtypes
 

module.exports = router;
