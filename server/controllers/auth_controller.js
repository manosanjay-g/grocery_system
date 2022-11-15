const userModel = require("../models/user_model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!(email && password)) {
      res.status(400).json({
        error: "All inputs are required",
      });
    }
    const user = await userModel.findOne({ email });
    if (user == null) {
      return res.status(400).json({
        error: "User does not exist",
      });
    }

    const decryptedPassword = await bcrypt.compare(password, user.password);
    if (user && decryptedPassword) {
      const token = jwt.sign(
        {
          user_id: user._id,
          email,
        },
        process.env.JWT_KEY
      );
      user.token = token;
      return res.status(200).json({
        token: user.token,
        id: user._id,
      });
    }
    res.status(400).json({
      error: "Invalid Credentials",
    });
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  login,
};
