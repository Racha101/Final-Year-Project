// const Branch = require("../models/Branch");
const Stock = require("../models/Stock");

// ✅ 1. Create a new branch (Admin)
// const createBranch = async (req, res) => {
//   try {
//     const { name, address, contact } = req.body;

//     const existing = await Branch.findOne({ name });
//     if (existing) return res.status(400).json({ msg: "Branch already exists" });

//     const branch = new Branch({ name, address, contact });
//     await branch.save();

//     res.json(branch);
//   } catch (err) {
//     res.status(500).json({ msg: "Failed to create branch" });
//   }
// };

// ✅ 2. Add stock to a branch (Admin)
const addOrUpdateStock = async (req, res) => {
  try {
    const { branchID, bloodType, quantity } = req.body;

    let stock = await Stock.findOne({ branchID, bloodType });

    if (stock) {
      stock.quantity += quantity;
      await stock.save();
    } else {
      stock = new Stock({ branchID, bloodType, quantity });
      await stock.save();
    }

    res.json({ msg: "Stock updated successfully", stock });
  } catch (err) {
    res.status(500).json({ msg: "Failed to update stock" });
  }
};

// ✅ 3. View all stock (Public)
const getAllStock = async (req, res) => {
  try {
    const stock = await Stock.find()
      .populate("branchID", "name address contact");

    res.json(stock);
  } catch (err) {
    res.status(500).json({ msg: "Failed to fetch stock" });
  }
};

// create a new controller for the blood Types
// create an api to create (already created)
// delete
// list all blood types

// api to add the list of users and save all the categories (this api only takes values) (add filters to search by name(user Regex), and other values) // regex is used for search, it is find like this name
// api for the branches_list
// api users_list
// api to create characteristics, eg. name: days having tattoo, type: number, handler_type: "should be less than", handler_value: 3
// api to get the list of characteristics (this should be used in the creation of the user)
// api check_user_donation_egligility -> send the username of the user -> returns if egligibile: true/false
// api to create_donation -> select a user on FE -> send to the api -> returns success -> saves the user data and date_of_donation, branch_name, branch_id
// api donation_list -> returns the list of donations -> add filter from to date, such that if i send to the api from_donation_date: it will show dates greater than sent, filter by branch
// note: dates need to be saved in iso format (create a function or use moment(), pass date as a param and it returns it formatted)
// note: on branch creation validate if the name of the branch was created, then return error else create
// note: branch creation should have: name(unique), location, employee count, address, street (check if we need any extra value)
// note: the user creation should not be in the register user

module.exports = {
  // createBranch,
  addOrUpdateStock,
  getAllStock
};
