const User = require("../models/User");

// GET /api/users
// Filters:
// ?name=ra        (regex search)
// ?bloodType=A+
// ?role=donor
// ?location=Beirut
const listUsers = async (req, res) => {
  try {
    const { name, bloodType, role, location } = req.query;

    const filter = {};

    if (name) {
      // Case-insensitive regex search
      filter.name = new RegExp(name, "i");
    }

    if (bloodType) filter.bloodType = bloodType;
    if (role) filter.role = role;

    if (location) {
      filter.location = new RegExp(location, "i");
    }

    const users = await User.find(filter)
      .select("-password") // never return passwords
      .sort({ name: 1 });

    res.json(users);
  } catch (err) {
    console.error("LIST USERS ERROR:", err);
    res.status(500).json({ msg: "Failed to fetch users" });
  }
};

module.exports = { listUsers };
