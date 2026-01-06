const mongoose = require("mongoose");

const DonationSchema = new mongoose.Schema(
  {
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    bloodType: {
      type: String,
      required: true
    },

    quantity: {
      type: Number,
      required: true
    },

    branchID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Branch",
      required: true
    },

    donationDate: {
      type: Date,
      default: () => new Date()
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Donation", DonationSchema);

