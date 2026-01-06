const User = require("../models/User");

const adminMiddleware = async (req, res, next) => {
  try {
    if (!req.user?.id) {
      return res.status(401).json({ msg: "Unauthorized" });
    }

    const user = await User.findById(req.user.id);
    if (!user || user.role !== "admin") {
      return res.status(403).json({ msg: "Admin access only" });
    }

    next();
  } catch (err) {
    res.status(500).json({ msg: "Authorization failed" });
  }
};

module.exports = adminMiddleware;