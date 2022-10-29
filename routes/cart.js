const router = require("express").Router();
const axios = require("axios");
const Cart = require("../Models/Cart");
const logger = require("../utils/logger");
require("dotenv").config();

//POST new cart
router.post("/", async (req, res) => {
  //get product service

  const product = await axios.get(
    `${process.env.API_GATEWAY}/api/products/${req.body.product}`
  );
  const priceProduct = product.data.data.price;
  const totalPrice = priceProduct * req.body.quantity;
  const cart = new Cart({
    product: req.body.product,
    quantity: req.body.quantity,
    price: priceProduct,
    totalPrice: totalPrice,
  });

  try {
    const savedCart = await cart.save();
    res.status(201).send({
      status: "success",
      message: "Chart created successfully",
      data: savedCart,
    });
    logger.info(
      `[${req.method}] - 201 - ${res.statusMessage} - ${req.originalUrl} - ${req.ip}`
    );
  } catch (err) {
    res.status(400).send({
      status: "error",
      message: "Cart not created",
      data: err,
    });
    logger.error(
      `[${req.method}] - 400 - ${res.statusMessage} - ${req.originalUrl} - ${req.ip}`
    );
  }
});

//GET all carts
router.get("/", async (req, res) => {
  try {
    const carts = await Cart.find();
    res.status(200).send({
      status: "success",
      message: "Carts retrieved successfully",
      data: carts,
    });
    logger.info(
      `[${req.method}] - 200 - ${res.statusMessage} - ${req.originalUrl} - ${req.ip}`
    );
  } catch (err) {
    res.status(400).send(err);
    logger.error(
      `[${req.method}] - 400 - ${res.statusMessage} - ${req.originalUrl} - ${req.ip}`
    );
  }
});

//GET cart by id
router.get("/:id", async (req, res) => {
  const cart = await Cart.findById(req.params.id);
  if (!cart) {
    res.status(404).send({
      status: "error",
      message: "Cart not found",
    });
    logger.error(
      `[${req.method}] - 404 - ${res.statusMessage} - ${req.originalUrl} - ${req.ip}`
    );
  }
  try {
    res.status(200).send({
      status: "success",
      message: "Cart retrieved successfully",
      data: cart,
    });
    logger.info(
      `[${req.method}] - 200 - ${res.statusMessage} - ${req.originalUrl} - ${req.ip}`
    );
  } catch (err) {
    res.status(400).send({
      status: "error",
      message: "Cart not retrieved",
      data: err,
    });
    logger.error(
      `[${req.method}] - 400 - ${res.statusMessage} - ${req.originalUrl} - ${req.ip}`
    );
  }
});

//DELETE cart by id

router.delete("/:id", async (req, res) => {
  const removedCart = await Cart.remove({ _id: req.params.id });
  if (!removedCart) {
    res.status(404).send({
      status: "error",
      message: "Cart not found",
    });
    logger.error(
      `[${req.method}] - 404 - ${res.statusMessage} - ${req.originalUrl} - ${req.ip}`
    );
  }

  try {
    res.status(202).send({
      status: "success",
      message: "Cart deleted successfully",
    });
    logger.info(
      `[${req.method}] - 202 - ${res.statusMessage} - ${req.originalUrl} - ${req.ip}`
    );
  } catch (err) {
    res.status(400).send({
      status: "error",
      message: "Cart not deleted",
      data: err,
    });
    logger.error(
      `[${req.method}] - 400 - ${res.statusMessage} - ${req.originalUrl} - ${req.ip}`
    );
  }
});

//UPDATE chart by id

router.patch("/:id", async (req, res) => {
  try {
    const updatedCart = await Cart.updateOne(
      { _id: req.params.id },
      { $set: { product: req.body.product } }
    );
    res.status(203).send({
      status: "success",
      message: "Chart updated successfully",
      data: updatedCart,
    });
    logger.info(
      `[${req.method}] - 203 - ${res.statusMessage} - ${req.originalUrl} - ${req.ip}`
    );
  } catch (err) {
    res.status(400).send({
      status: "error",
      message: "Chart not updated",
      data: err,
    });
    logger.error(
      `[${req.method}] - 400 - ${res.statusMessage} - ${req.originalUrl} - ${req.ip}`
    );
  }
});

module.exports = router;
