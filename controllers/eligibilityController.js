const Eligibility = require("../models/Eligibility");
const Donation = require("../models/Donation");
const BloodType = require("../models/BloodType");

// ✅ 1. Submit eligibility form & calculate status
const submitEligibilityForm = async (req, res) => {
  try {
    const {
      userID,
      weight,
      lastDonationDate,
      tattooLast6Months,
      majorSurgeryLast6Months,
      chronicDisease
    } = req.body;

    let eligible = true;
    let nextEligibleDate = null;

    // Rule 1: Weight must be >= 50kg
    if (weight < 50) eligible = false;

    // Rule 2: No tattoo or surgery in last 6 months
    if (tattooLast6Months || majorSurgeryLast6Months) eligible = false;

    // Rule 3: No chronic disease
    if (chronicDisease) eligible = false;

    // Rule 4: 56 days since last donation
    if (lastDonationDate) {
      const lastDate = new Date(lastDonationDate);
      const nextDate = new Date(lastDate);
      nextDate.setDate(nextDate.getDate() + 56);

      if (new Date() < nextDate) {
        eligible = false;
        nextEligibleDate = nextDate;
      }
    }

    const newEligibility = new Eligibility({
      userID,
      weight,
      lastDonationDate,
      tattooLast6Months,
      majorSurgeryLast6Months,
      chronicDisease,
      eligible,
      nextEligibleDate
    });

    await newEligibility.save();

    res.json({
      msg: eligible ? "You are eligible to donate" : "You are not eligible to donate",
      eligible,
      nextEligibleDate
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
};

// ✅ 2. Create Blood Types (Admin)
const createBloodType = async (req, res) => {
  try {
    const { type } = req.body;

    const existing = await BloodType.findOne({ type });
    if (existing) return res.status(400).json({ msg: "Blood type already exists" });

    const bloodType = new BloodType({ type });
    await bloodType.save();

    res.json(bloodType);
  } catch (err) {
    res.status(500).json({ msg: "Failed to create blood type" });
  }
};

// ✅ 3. Create Donation (Donation Form)
const createDonation = async (req, res) => {
  try {
    const { userID, bloodType, quantity = 1, branchID, branchName } = req.body;

    const donation = new Donation({
      userID,
      bloodType,
      quantity,
      branchID
      // branchName
    });

    await donation.save();

    res.json({ msg: "Donation recorded successfully", donation });
  } catch (err) {
    console.log('err', err)
    res.status(500).json({ msg: "Failed to save donation" });
  }
};

module.exports = {
  submitEligibilityForm,
  createBloodType,
  createDonation
};

