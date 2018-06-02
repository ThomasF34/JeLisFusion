
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

participateRoute.get('/takenSeat/:idWorkshop', (req, res) =>{
  participateController.getTakenSeat(req, req.params.idWorkshop, nbTakenSeat => {
    console.log(nbTakenSeat);
    return res.status(200).json(nbTakenSeat);
  });
});

participateRoute.post('/create', token.verifyToken, (req, res) =>{
  participateController.create(req, ret => {
    if(ret === undefined){
      return res.status(418).json({message : "Already participate"});
    } else {
      return res.status(200).json("Successfully added");
    }
  });
});

participateRoute.delete('/deleteFromWorkshop/:idWorkshop', token.verifyAdmin, (req, res) => {
  console.log('Atelier °'+ req.params.idWorkshop);
  participateController.deleteFromWksp(req, req.params.idWorkshop, participate => {
    return res.status(200).json(participate);
  })
});

participateRoute.delete('/delete/workshop/:idWorkshop/user/:idUser', token.verifyAdmin, (req, res) => {
  participateController.deleteParticular(req, req.params.idWorkshop, req.params.idUser, participate => {
    return res.status(200).json(participate);
  })
});



module.exports = participateRoute;


