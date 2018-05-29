const token = require('./token');
// Modules
const express = require('express');
const workshopRoute = express.Router();

const workshopController = require('../controllers/workshop');

workshopRoute.get('/getAll', (req,res) => {
  workshopController.getAll(req, workshops => {
    return res.status(200).json(workshops);
  })
});

workshopRoute.post('/add', (req, res) => {
  workshopController.add(req, workshop => {
    return res.status(200).json(workshop);
  })
})

workshopRoute.get('/:idWorkshop', (req, res) => {
  workshopController.getByID(req, req.params.idWorkshop, workshop => {
    if(workshop === undefined){
      console.log("Workshop not found");
      return res.status(303).json(workshop);
    } else {
      return res.status(200).json(workshop);
    }
  });
});

workshopRoute.put('/:idWorkshop/update', token.verifyToken, (req, res) => {
  console.log("Puting update");
  workshopController.update(req, workshop => {
    return res.status(200).json(workshop);
  })
  }
);

workshopRoute.delete('/:idWorkshop/delete', token.verifyToken, (req, res) => {
    workshopController.delete(req, req.params.idWorkshop, workshop => {
      return res.status(200).json(workshop);
    })
  }
);

module.exports = workshopRoute;
