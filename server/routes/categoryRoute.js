
// Modules
const express = require('express');
const categoryRoute = express.Router();

//Call for controller
var categoryController = require('../controllers/category');

categoryRoute.get("/getAllCategories", (req, res) => {
  console.log("In route Category");
  categoryController.getAll(req, categories => {
    return res.status(200).json(categories);
  })
});

categoryRoute.get('/:idCategory',(req, res) => {
  console.log("In route Category");
  categoryController.getByID(req, req.params.idCategory, category => {
    return res.status(200).json(category);
  })
});

module.exports = categoryRoute;
