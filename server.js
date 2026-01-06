console.log("✅ THIS IS THE ACTIVE SERVER FILE");

const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./config/db");

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB();

// Auth routes
const authRoutes = require("./routes/auth");
app.use("/api/auth", authRoutes);

// Eligibility routes
const eligibilityRoutes = require("./routes/eligibility");
app.use("/api/eligibility", eligibilityRoutes);

// Blood types routes
const bloodTypeRoutes = require("./routes/bloodTypes");
app.use("/api/bloodtypes", bloodTypeRoutes);

// Users routes
const userRoutes = require("./routes/users");
app.use("/api/users", userRoutes);

// Branches routes
const branchRoutes = require("./routes/branches");
app.use("/api/branches", branchRoutes);

// Donations routes
const donationRoutes = require("./routes/donations");
app.use("/api/donations", donationRoutes);

// Stock routes
const stockRoutes = require("./routes/stock");
app.use("/api/stocks", stockRoutes);


// Characteristics routes
const characteristicRoutes = require("./routes/characteristics");
app.use("/api/characteristics", characteristicRoutes);

// Eligibility engine routes
const eligibilityEngineRoutes = require("./routes/eligibilityEngine");
app.use("/api/eligibility-engine", eligibilityEngineRoutes);


// Home route
app.get("/", (req, res) => {
  res.send("Blood Connect Backend Running");
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
