const mongoose = require("mongoose");

const EligibilitySchema = new mongoose.Schema({
  userID: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  weight: { type: Number, required: true },
  lastDonationDate: { type: Date },
  tattooLast6Months: { type: Boolean, required: true },
  majorSurgeryLast6Months: { type: Boolean, required: true },
  chronicDisease: { type: Boolean, required: true },
  eligible: { type: Boolean, default: false },
  nextEligibleDate: { type: Date }
}, { timestamps: true });

module.exports = mongoose.model("Eligibility", EligibilitySchema);
