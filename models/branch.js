const mongoose = require("mongoose");

const BranchSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },

    location: { type: String, required: true },

    employeeCount: { type: Number, required: true },

    address: { type: String, required: true },

    street: { type: String, required: true },

    
    contact: { type: String }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Branch", BranchSchema);


