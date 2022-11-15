const userModel = require("../models/user_model.js");
const groceryModel = require("../models/grocery_model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//user Related Functions
const addUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    if (!(name && email && role && password)) {
      console.log(req.body);
      return res.status(400).json({
        error: "All input are required",
      });
    }
    const olduser = await userModel.findOne({
      email: email,
    });
    if (olduser) {
      return res.status(400).json({
        error: "User already exist",
      });
    }
    encryptedPassword = await bcrypt.hash(password, 15);

    const user = await userModel.create({
      name,
      email: email.toLowerCase(),
      password: encryptedPassword,
      role,
    });

    const token = jwt.sign(
      {
        user_id: user._id,
        email,
      },
      process.env.JWT_KEY
    );
    user.token = token;
    res.status(201).json({
      user_res: user,
    });
  } catch (error) {
    console.log(err);
  }
};

const readUser = async (req, res) => {
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

const updateUser = async (req, res) => {
  try {
    const id = req.params.id;
    const { name, email } = req.body;

    const user = await userModel.findByIdAndUpdate(
      { _id: id },
      {
        $set: {
          name: name,
          email: email,
        },
      }
    );
    res.status(201).json({
      user_update_res: user,
    });
  } catch (err) {
    console.log(err);
  }
};

const deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    const deletedUser = await userModel.deleteOne({ _id: id });
    res.status(204).json({
      user_deleted_res: deletedUser,
    });
  } catch (err) {
    console.log(err);
  }
};

const readUsers = async (req, res) => {
  try {
    const users = await userModel.find({});
    return res.status(200).json({
      users_res: users,
    });
  } catch (err) {
    console.log(err);
  }
};

const deleteUsers = async (req, res) => {
  try {
    const deleteduser = await userModel.deleteMany({});
    res.status(204).json({
      users_deleted_res: deleteduser,
    });
  } catch (err) {
    console.log(err);
  }
};

//Grocery Related Functions
const addGrocery = async (req, res) => {
  try {
    const { name, quantity, category, price, img_url } = req.body;
    if (!(name && price && category)) {
      return res.status(400).json({
        error: "All input are required",
      });
    }
    const oldGrocery = await groceryModel.findOne({ name });
    if (oldGrocery) {
      return res.status(400).json({
        error: "Grocery already exist",
      });
    }
    const grocery = await groceryModel.create({
      name,
      quantity,
      category,
      price,
      img_url,
    });

    res.status(201).json({
      grocery_res: grocery,
    });
  } catch (error) {
    console.log(err);
  }
};

const readGrocery = async (req, res) => {
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

const updateGrocery = async (req, res) => {
  try {
    const id = req.params.id;
    const { quantity, category, price, img_url, name } = req.body;

    const grocery = await groceryModel.findByIdAndUpdate(
      { _id: id },
      {
        $set: {
          quantity: quantity,
          category: category,
          price: price,
          name,
          img_url,
        },
      }
    );
    res.status(201).json({
      grocery_update_res: grocery,
    });
  } catch (err) {
    console.log(err);
  }
};

const deleteGrocery = async (req, res) => {
  try {
    const id = req.params.id;
    const deletedGrocery = await groceryModel.deleteOne({ _id: id });
    res.status(204).json({
      grocery_deleted_res: deletedGrocery,
    });
  } catch (err) {
    console.log(err);
  }
};

const readGroceries = async (req, res) => {
  try {
    const groceries = await groceryModel.find({});
    return res.status(200).json({
      groceries_res: groceries,
    });
  } catch (err) {
    console.log(err);
  }
};

const deleteGroceries = async (req, res) => {
  try {
    const deletedgroceries = await groceryModel.deleteMany({});
    res.status(204).json({
      groceries_deleted_res: deletedgroceries,
    });
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  addUser,
  updateUser,
  readUser,
  deleteUser,
  readUsers,
  deleteUsers,
  addGrocery,
  deleteGrocery,
  updateGrocery,
  readGrocery,
  readGroceries,
  deleteGroceries,
};
