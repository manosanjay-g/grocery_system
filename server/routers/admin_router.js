const express = require("express");
const router = express.Router();
const {
  addUser,
  readUser,
  updateUser,
  deleteUser,
  deleteUsers,
  readUsers,
  deleteGrocery,
  updateGrocery,
  readGrocery,
  addGrocery,
  readGroceries,
  deleteGroceries,
} = require("../controllers/admin_controller");
//User related routes
router.post("/users/", addUser);
router.get("/users/:id", readUser);
router.patch("/users/:id", updateUser);
router.delete("/users/:id", deleteUser);

router.get("/users/", readUsers);
router.delete("/users/", deleteUsers);

//Grocery related routes
router.post("/groceries/", addGrocery);
router.get("/groceries/:id", readGrocery);
router.patch("/groceries/:id", updateGrocery);
router.delete("/groceries/:id", deleteGrocery);

router.get("/groceries/", readGroceries);
router.delete("/groceries/", deleteGroceries);

module.exports = router;
