const fs = require("fs");
const express = require("express");
const app = express();

// Importing products from products.json file
const products = JSON.parse(fs.readFileSync(`${__dirname}/data/products.json`));

// Middlewares
app.use(express.json());

// Write GET endpoint for sending product to the client here
// Endpoint - /api/v1/products/:name/:price
app.get("/api/v1/products", (req, res) => {
  res.status(200).json({
    status: "Success",
    message: "Detail of users fetched successfully",
    data: {
      products,
    },
  });
});

// GET endpoint for sending the products to client by id
app.get("/api/v1/products/:name/:price", (req, res) => {
  let { name, price } = req.params;

  const product = products.find(
    (product) => product.name === name && product.price === Number(price)
  );

  // log the value of product
  if (product) {
    return res.status(200).send({
      status: "success",
      message: "Details of users fetched successfully",
      data: {
        product,
      },
    });
  }

  res.status(404).send({
    status: "failed",
    message: "Product not found!",
  });
});

module.exports = app;
