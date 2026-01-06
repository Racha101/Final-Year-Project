const mongoose = require("mongoose");

const BloodTypeSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
    required: true,
    unique: true
  }
});

module.exports = mongoose.model("BloodType", BloodTypeSchema);
