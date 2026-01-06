const Eligibility = require("../models/Eligibility");
const Donation = require("../models/Donation");


// CREATE DONATION (WITH ELIGIBILITY CHECK)
// POST /api/donations

const createDonation = async (req, res) => {
  try {
    const { userID, bloodType, quantity, branchID } = req.body;

    // Validate input
    if (!userID || !bloodType || !quantity || !branchID) {
      return res.status(400).json({ msg: "All fields are required" });
    }

    // 🔍 Get latest eligibility record for this user
    const eligibility = await Eligibility.findOne({ userID })
      .sort({ createdAt: -1 });

    // User never submitted eligibility form
    if (!eligibility) {
      return res.status(400).json({
        msg: "Eligibility form not submitted"
      });
    }

    // User not eligible
    if (!eligibility.eligible) {
      return res.status(400).json({
        msg: "User not eligible to donate",
        nextEligibleDate: eligibility.nextEligibleDate
      });
    }

    // ✅ Eligible → create donation
    const donation = new Donation({
      userID,
      bloodType,
      quantity,
      branchID,
      donationDate: new Date() 
    });

    await donation.save();

    res.json({
      msg: "Donation recorded successfully",
      donation
    });

  } catch (err) {
    console.error("CREATE DONATION ERROR:", err);
    res.status(500).json({
      msg: "Failed to create donation",
      error: err.message
    });
  }
};


// LIST DONATIONS WITH FILTERS
// GET /api/donations

const listDonations = async (req, res) => {
  try {
    const { fromDate, toDate, branchID, userID } = req.query;
    const filter = {};

    if (branchID) filter.branchID = branchID;
    if (userID) filter.userID = userID;

    if (fromDate || toDate) {
      filter.donationDate = {};
      if (fromDate) filter.donationDate.$gte = new Date(fromDate);
      if (toDate) filter.donationDate.$lte = new Date(toDate);
    }

    const donations = await Donation.find(filter)
      .populate("userID", "name email")
      .populate("branchID", "name location")
      .sort({ donationDate: -1 });

    res.json(donations);

  } catch (err) {
    console.error("LIST DONATIONS ERROR:", err);
    res.status(500).json({
      msg: "Failed to fetch donations",
      error: err.message
    });
  }
};

module.exports = { createDonation, listDonations };

