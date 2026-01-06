const Characteristic = require("../models/Characteristic");
const User = require("../models/User");

// POST /api/eligibility/check
const checkUserEligibility = async (req, res) => {
  try {
    const { userId, answers } = req.body;

    if (!userId || !answers) {
      return res.status(400).json({ msg: "userId and answers are required" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    const characteristics = await Characteristic.find();

    for (const rule of characteristics) {
      const userValue = answers[rule.name];

      // If user did not answer this rule
      if (userValue === undefined) {
        return res.json({
          eligible: false,
          failed_rule: rule.name,
          reason: "Missing value"
        });
      }

      // Apply rule logic
      if (rule.type === "number") {
        if (rule.handler_type === "should_be_greater_than") {
          if (!(userValue > rule.handler_value)) {
            return res.json({
              eligible: false,
              failed_rule: rule.name
            });
          }
        }

        if (rule.handler_type === "should_be_less_than") {
          if (!(userValue < rule.handler_value)) {
            return res.json({
              eligible: false,
              failed_rule: rule.name
            });
          }
        }

        if (rule.handler_type === "equals") {
          if (userValue !== rule.handler_value) {
            return res.json({
              eligible: false,
              failed_rule: rule.name
            });
          }
        }
      }
    }

    // If all rules passed
    return res.json({
      eligible: true
    });

  } catch (err) {
    console.error("ELIGIBILITY ENGINE ERROR:", err);
    res.status(500).json({ msg: "Eligibility check failed" });
  }
};

module.exports = { checkUserEligibility };
