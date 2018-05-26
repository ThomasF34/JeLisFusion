
// Modules
const express = require('express');
const userRoute = express.Router();

//Call for controller
var userController = require('../controllers/user');

userRoute.post("/register",(req,res) => {
  console.log("In route User");
  console.log(req.body);
  userController.register(req, user => {
    return res.status(200).json(user);
  })
});

module.exports = userRoute;
