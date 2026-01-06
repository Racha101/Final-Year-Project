console.log("✅ users routes loaded");
const express = require("express");
const router = express.Router();
const { listUsers } = require("../controllers/userController");

// List users + filters
router.get("/", listUsers); // GET /api/users

module.exports = router;
