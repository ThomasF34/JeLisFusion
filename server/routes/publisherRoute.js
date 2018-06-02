const express = require('express');
const publisherRoute = express.Router();

const token = require('./token');
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

publisherRoute.post('/create', token.verifyAdmin, (req, res) => {
  publisherController.add(req, publisher => {
    return res.status(200).json(publisher);
  })
});

publisherRoute.put('/:idPublisher/update',token.verifyAdmin,  (req, res) => {
  publisherController.update(req, publisher => {
    return res.status(200).json(publisher);
  })
});

publisherRoute.put('/:idPublisher/updateBook',token.verifyAdmin, (req,res) => {
  publisherController.updateBook(req, req.params.idPublisher, publisher => {
    return res.status(200).json(publisher);
  })
});


publisherRoute.delete('/:idPublisher/deletePublisher',token.verifyAdmin, (req, res) => {
  publisherController.deletePublisher(req, req.params.idPublisher, publisher => {
    return res.status(200).json(publisher);
  })
});




module.exports = publisherRoute;
