
// Modules

const express = require('express');
const authorRoute = express.Router();

const token = require('./token');
const authorController = require('../controllers/author');


authorRoute.get('/getAllAuthors',(req, res) => {
  authorController.getAllAuthors(req, authors => {
    return res.status(200).json(authors);
  });
});


authorRoute.get('/:idAuthor', (req, res) => {
  authorController.get(req, req.params.idAuthor, author => {
    if(author === undefined){
      return res.status(404).json(author);
    } else {
      return res.status(200).json(author);
    }
  });
});

authorRoute.post('/create', token.verifyAdmin, (req, res) => {
  authorController.add(req, author => {
    return res.status(200).json(author);
  })
});


authorRoute.put('/:idAuthor/update', token.verifyAdmin, (req, res) => {
  authorController.update(req, author => {
    return res.status(200).json(author);
  })
});

authorRoute.delete('/:idAuthor/deleteWritten',token.verifyAdmin, (req,res) => {
  authorController.deleteWritten(req, req.params.idAuthor, author => {
    return res.status(200).json(author);
  })
});


authorRoute.delete('/:idAuthor/deleteAuthor',token.verifyAdmin, (req, res) => {
  authorController.deleteAuthor(req, req.params.idAuthor, author => {
    return res.status(200).json(author);
  })
});


module.exports = authorRoute;

