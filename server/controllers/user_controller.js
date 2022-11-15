const userModel = require("../models/user_model");
const groceryModel = require("../models/grocery_model");
const getUserInfo = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await userModel.findOne({ _id: id });
    return res.status(200).json({
      user_res: user,
    });
  } catch (err) {
    console.log(err);
  }
};

const getGroceryInfo = async (req, res) => {
  try {
    const id = req.params.id;
    const grocery = await groceryModel.findOne({ _id: id });
    return res.status(200).json({
      grocery_res: grocery,
    });
  } catch (err) {
    console.log(err);
  }
};

const getGroceries = async (req, res) => {
  try {
    const groceries = await groceryModel.find({});
    return res.status(200).json({
      groceries_res: groceries,
    });
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  getGroceries,
  getUserInfo,
  getGroceryInfo,
};
