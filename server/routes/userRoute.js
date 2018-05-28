const jwt = require('jsonwebtoken');

// Modules
const express = require('express');
const userRoute = express.Router();

//Call for controller
var userController = require('../controllers/user');

userRoute.post("/register",(req,res) => {
  console.log("In route User");
  console.log(req.body);
  userController.register(req, user => {
    //Creation of payload for token auth
    let payload = { subject : user.insertId};
    let token = jwt.sign(payload, 'secretKey');
    res.status(200).json({token});
  })
});

userRoute.post("/login", (req,res) => {
  userController.loginUser(req, user =>{
    if(user === undefined || user.password !== req.body.password){
      res.status(401).json(user);
    } else {
      let payload = { subject : user.idUser }
      let token = jwt.sign(payload, 'secretKey');
      res.status(200).json({token});
    }
  })
})


userRoute.get('/events', (req,res)=> {
  let events = [
    {
      "_id" : "1",
      "name" : "maBite",
      "coucou" : "coucou"
    }
  ];
  res.json(events);
});

userRoute.get('/special', (req,res)=> {
  let special = [
    {
      "_id" : "1",
      "name" : "maBite",
      "coucou" : "coucou"
    }
  ];
  res.json(special);
});

module.exports = userRoute;
