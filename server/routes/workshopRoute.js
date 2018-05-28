
// Modules
const express = require('express');
const workshopRoute = express.Router();

const workshopController = require('../controllers/workshop');

workshopRoute.get('/getAll', (req,res) => {
  workshopController.getAll(req, workshops => {
    return res.status(200).json(workshops);
  })
});


module.exports = workshopRoute;
