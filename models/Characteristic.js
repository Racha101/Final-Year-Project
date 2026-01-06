const mongoose = require("mongoose");

const CharacteristicSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },

    // number | boolean | string
    type: { type: String, required: true },

    // comparison logic
    // should_be_less_than | should_be_greater_than | equals
    handler_type: { type: String, required: true },

    handler_value: { type: mongoose.Schema.Types.Mixed, required: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Characteristic", CharacteristicSchema);
