const mongoose = require("mongoose");

const StockSchema = new mongoose.Schema({
  branchID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Branch",
    required: true
  },
  bloodType: {
    type: String,
    enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    default: 0
  }
}, { timestamps: true });

module.exports = mongoose.model("Stock", StockSchema);
