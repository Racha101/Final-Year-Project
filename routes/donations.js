const express = require("express");
const router = express.Router();
const {
  createDonation,
  listDonations
} = require("../controllers/donationController");

router.post("/", createDonation); // POST /api/donations
router.get("/", listDonations);   // GET /api/donations

module.exports = router;
