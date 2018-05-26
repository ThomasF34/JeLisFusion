
// Modules
const express = require('express');
const categoryRoute = express.Router();

//Call for controller
var categoryController = require('../controllers/category');

categoryRoute.get("/getAllCategories", (req, res) => {
  console.log("In route Catgeory");
  categoryController.getAll(req, categories => {
    return res.status(200).json(categories);
  })
});

module.exports =categoryRoute;
