const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// Modules
const express = require('express');
const userRoute = express.Router();

//Call for controller
var userController = require('../controllers/user');

userRoute.post("/register", (req,res) => {
  console.log("In route User");
  userController.register(req, user => {
    //Creation of payload for token auth
    let payload = { subject : user.insertId};
    let token = jwt.sign(payload, 'ItsASecretKey');
    res.status(200).json({token});
  })
});

userRoute.post("/login", (req,res) => {
  userController.loginUser(req, user =>{
    if(user === undefined || !bcrypt.compareSync(req.body.password, user.password)){
      res.status(401).json(user);
    } else {
      let payload = { subject : user.idUser }
      let token = jwt.sign(payload, 'ItsASecretKey');
      res.status(200).json({token});
    }
  })
});


module.exports = userRoute;
