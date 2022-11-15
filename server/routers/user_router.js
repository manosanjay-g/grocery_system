const express = require("express");
const router = express.Router();
const {
  getUserInfo,
  getGroceries,
  getGroceryInfo,
} = require("../controllers/user_controller");

router.get("/groceries/", getGroceries);
router.get("/groceries/:id", getGroceryInfo);
router.get("/:id", getUserInfo);

module.exports = router;
