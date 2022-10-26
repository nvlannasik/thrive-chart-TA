const router = require("express").Router();
const Chart = require("../Models/Chart");
const logger = require("../utils/logger");

//POST new chart

router.post("/", async (req, res) => {
  const chart = new Chart({
    product: req.body.product,
    quantity: req.body.quantity,
    price: req.body.price,
    totalPrice: req.body.totalPrice,
  });
  try {
    const savedChart = await chart.save();
    res.status(201).send({
      status: "success",
      message: "Chart created successfully",
      data: savedChart,
    });
    logger.info(
      `[${req.method}] - 201 - ${res.statusMessage} - ${req.originalUrl} - ${req.ip}`
    );
  } catch (err) {
    res.status(400).send({
      status: "error",
      message: "Chart not created",
      data: err,
    });
    logger.error(
      `[${req.method}] - 400 - ${res.statusMessage} - ${req.originalUrl} - ${req.ip}`
    );
  }
});

//GET all charts

router.get("/", async (req, res) => {
  try {
    const charts = await Chart.find();
    res.status(200).send({
      status: "success",
      message: "Charts retrieved successfully",
      data: charts,
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

//GET chart by id

router.get("/:id", async (req, res) => {
  const chart = await Chart.findById(req.params.id);
  if (!chart) {
    res.status(404).send({
      status: "error",
      message: "Chart not found",
    });
    logger.error(
      `[${req.method}] - 404 - ${res.statusMessage} - ${req.originalUrl} - ${req.ip}`
    );
  }
  try {
    res.status(200).send({
      status: "success",
      message: "Chart retrieved successfully",
      data: chart,
    });
    logger.info(
      `[${req.method}] - 200 - ${res.statusMessage} - ${req.originalUrl} - ${req.ip}`
    );
  } catch (err) {
    res.status(400).send({
      status: "error",
      message: "Chart not retrieved",
      data: err,
    });
    logger.error(
      `[${req.method}] - 400 - ${res.statusMessage} - ${req.originalUrl} - ${req.ip}`
    );
  }
});

//DELETE chart by id

router.delete("/:id", async (req, res) => {
  const removedChart = await Chart.remove({ _id: req.params.id });
  if (!removedChart) {
    res.status(404).send({
      status: "error",
      message: "Chart not found",
    });
    logger.error(
      `[${req.method}] - 404 - ${res.statusMessage} - ${req.originalUrl} - ${req.ip}`
    );
  }

  try {
    res.status(202).send({
      status: "success",
      message: "Chart deleted successfully",
    });
    logger.info(
      `[${req.method}] - 202 - ${res.statusMessage} - ${req.originalUrl} - ${req.ip}`
    );
  } catch (err) {
    res.status(400).send({
      status: "error",
      message: "Chart not deleted",
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
    const updatedChart = await Chart.updateOne(
      { _id: req.params.id },
      { $set: { product: req.body.product } }
    );
    res.status(203).send({
      status: "success",
      message: "Chart updated successfully",
      data: updatedChart,
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
