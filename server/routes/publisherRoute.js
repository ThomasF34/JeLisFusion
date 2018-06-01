const express = require('express');
const publisherRoute = express.Router();

const publisherController = require('../controllers/publisher');

publisherRoute.get('/getAllPublishers', (req,res) =>{
  console.log("In route Publisher");
  publisherController.getAll(req, publishers => {
    return res.status(200).json(publishers);
  });
});

publisherRoute.get('/:idPublisher', (req, res) => {
  console.log("In route Publisher");
  publisherController.getByID(req, req.params.idPublisher, publisher => {
    if(publisher === undefined){
      return res.status(404).json(publisher);
    } else {
      return res.status(200).json(publisher);
    }
  })
});



module.exports = publisherRoute;
