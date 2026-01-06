const Branch = require("../models/branch");
// CREATE BRANCH
// POST /api/branches
const createBranch = async (req, res) => {
  try {
    const {
      name,
      location,
      employeeCount,
      address,
      street,
      contact
    } = req.body;

    // Validate required fields
    if (!name || !location || !employeeCount || !address || !street) {
      return res.status(400).json({ msg: "All required fields must be provided" });
    }

    // Check unique name
    const exists = await Branch.findOne({ name });
    if (exists) {
      return res.status(400).json({ msg: "Branch already exists" });
    }

    const branch = new Branch({
      name,
      location,
      employeeCount,
      address,
      street,
      contact
    });

    await branch.save();
    res.json(branch);
  } catch (err) {
    console.error("CREATE BRANCH ERROR:", err);
    res.status(500).json({ msg: "Failed to create branch" });
  }
};

// LIST BRANCHES
// GET /api/branches
// Filters: ?name=cen&location=beirut
const listBranches = async (req, res) => {
  try {
    const { name, location } = req.query;
    const filter = {};

    if (name) filter.name = new RegExp(name, "i");
    if (location) filter.location = new RegExp(location, "i");

    const branches = await Branch.find(filter).sort({ name: 1 });
    res.json(branches);
  } catch (err) {
    console.error("LIST BRANCHES ERROR:", err);
    res.status(500).json({ msg: "Failed to fetch branches" });
  }
};

module.exports = { createBranch, listBranches };
