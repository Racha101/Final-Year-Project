const express = require("express");
const router = express.Router();
const {
  checkUserEligibility
} = require("../controllers/eligibilityEngineController");

router.post("/check", checkUserEligibility);

module.exports = router;
