
// Modules
const express = require('express');
const booksRoute = express.Router();

//Call for controller
var book = require('../controllers/book');

// Renvoie toute les activités de la base de donnees
booksRoute.get('/getAllBooks',(req, res) => {
  console.log('Dans bookRoute1');
  book.getAllBooks(req, books => {
    console.log('Dans bookRoute2');
    return res.status(200).json(books);
  });
});

/*
tagRoutes.put   ('/:id', auth, tag.update_tag);
tagRoutes.delete('/:id', auth, tag.delete_tag);
*/


module.exports = booksRoute;
