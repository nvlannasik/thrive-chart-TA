const mongoose = require("mongoose");
autoIncrement = require("mongoose-auto-increment");
require("dotenv");
let connection = mongoose.createConnection(process.env.DB_CONNECTION);
autoIncrement.initialize(connection);

const chartSchema = new mongoose.Schema(
  {
    product: String,
    quantity: Number,
    price: Number,
    totalPrice: Number,
  },
  { versionKey: false }
);

chartSchema.plugin(autoIncrement.plugin, "Cart");
module.exports = mongoose.model("Cart", chartSchema);
