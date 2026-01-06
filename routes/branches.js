const express = require("express");
const router = express.Router();
const {
  createBranch,
  listBranches
} = require("../controllers/branchController");

const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

router.post("/", authMiddleware, adminMiddleware, createBranch); // POST /api/branches
router.get("/", listBranches);  // GET /api/branches

module.exports = router;
