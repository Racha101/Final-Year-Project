const express = require("express");
const router = express.Router();

console.log("✅ INSIDE stock.js ROUTE FILE");

const {
  createBranch,
  addOrUpdateStock,
  getAllStock
} = require("../controllers/stockController");

// router.post("/branch", (req, res, next) => {
//   console.log("✅ /branch route HIT");
//   return createBranch(req, res, next);
// });

router.post("/add", (req, res, next) => {
  console.log("✅ /add route HIT");
  return addOrUpdateStock(req, res, next);
});

router.get("/all", (req, res, next) => {
  console.log("✅ /all route HIT");
  return getAllStock(req, res, next);
});

module.exports = router;

