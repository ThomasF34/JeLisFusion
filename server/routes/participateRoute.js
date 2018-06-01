
// Modules
const express = require('express');
const participateRoute = express.Router();

const token = require('./token');

//Call for controller
var participateController = require('../controllers/participate');

participateRoute.get('/workshop/:idWorkshop',(req, res) => {
  participateController.getAllParticipateFromWorkshop(req, req.params.idWorkshop, participates => {
    if(participates === undefined){
      return res.status(404).json(participates);
    } else {
      return res.status(200).json(participates);
    }  });
});

participateRoute.get('/user/:idUser',(req, res) => {
  console.log(req.params.idUser);
  participateController.getAllParticipateFromUser(req, req.params.idUser, participates => {
    if(participates === undefined){
      return res.status(404).json(participates);
    } else {
      return res.status(200).json(participates);
    }
  });
});


module.exports = participateRoute;


