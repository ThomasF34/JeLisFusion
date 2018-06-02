const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const token = require('./token');
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
    let token = jwt.sign(payload, 'ItsASecretKey', {expiresIn: 60 * 60});
    res.status(200).json({token});
  })
});

userRoute.post("/login", (req,res) => {
  userController.loginUser(req, user =>{
    if(user === undefined || !bcrypt.compareSync(req.body.password, user.password)){
      res.status(401).json(user);
    } else {
      userController.isAdmin(req, user.idUser, bool => {
        const payload = { subject : user.idUser };
        const token = jwt.sign(payload, 'ItsASecretKey', {expiresIn: 60 * 60});
        console.log(token);
        console.log(bool);
        res.status(200).json({token, bool});
      })
    }
  })
});

/*userRoute.get("/getAdmin", token.getUserIdFromToken)
{
  return userController.isAdmin(req, req.idUser);
};*/

userRoute.get("/getAdmin", token.getUserIdFromToken, (req,res) => {
  userController.isAdmin(req, req.idUser, bool => {
    return res.status(200).json(bool);
  });
});

userRoute.get('/loggedInInfo', token.verifyToken, (req, res) => {
  userController.get(req, req.idUser, user => {
    if(user === undefined){
      return res.status(404).json(user);
    } else {
      return res.status(200).json(user);
    }
  });
});

module.exports = userRoute;
