
// Modules
const express = require('express');
const booksRoute = express.Router();

//Call for controller
var bookController = require('../controllers/book');


booksRoute.get('/getBookByID/:idBook',(req, res) => {
  console.log('Demande un seul book');
  bookController.getBookByID(req, req.params.idBook, book => {
    if(book === undefined){
      console.log("4O4 Book not found (Redirect?)");
      return res.status(303).json(book);
    } else {
      return res.status(200).json(book);
    }
  });
});

booksRoute.get('/getAllBooks',(req, res) => {
  console.log('Dans bookRoute1');
  bookController.getAllBooks(req, books => {
    console.log('Dans bookRoute2');
    res.responseCode = 404;
    return res.json(books);
  });
});

booksRoute.get('/cat/:category',(req, res) => {
  console.log('Demande une categorie');
  bookController.getBookByCat(req, req.params.category, books => {
    if(books === undefined){
      console.log("4O4 Book not found (Redirect?)");
      return res.status(303).json(books);
    } else {
      return res.status(200).json(books);
    }
  });
});

booksRoute.get('/:idBook/authors',(req, res) => {
  console.log('Asking for authors');
  bookController.getAuthorsByBookID(req, req.params.idBook, authors => {
    if(authors === undefined){
      console.log("4O4 Book not found (Redirect?)");
      return res.status(303).json(authors);
    } else {
      return res.status(200).json(authors);
    }
  });
});

booksRoute.post('/add', (req,res) => {
  console.log("In book route");
  bookController.add(req, book => {
    return res.status(200).json(book);
  })
})
/*
tagRoutes.put   ('/:id', auth, tag.update_tag);
tagRoutes.delete('/:id', auth, tag.delete_tag);
*/


module.exports = booksRoute;






