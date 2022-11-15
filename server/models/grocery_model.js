const mongoose = require("mongoose");

const grocerySchema = new mongoose.Schema(
  {
    img_url: { type: String, default: "" },
    name: { type: String, required: true },
    quantity: { type: Number, default: 0 },
    category: { type: String, required: true },
    price: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const groceryCollection = mongoose.model("grocery", grocerySchema, "groceries");

module.exports = groceryCollection;
