const express = require("express");
const router = express.Router();
const {
  submitEligibilityForm,
  createBloodType,
  createDonation
} = require("../controllers/eligibilityController");

router.post("/submit", submitEligibilityForm);
router.post("/bloodtype", createBloodType);
router.post("/donation", createDonation);

module.exports = router;
