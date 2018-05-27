
// Modules
const express = require('express');
const bookRoute = express.Router();

//Call for controller
var bookController = require('../controllers/book');


bookRoute.get('/getBookByID/:idBook',(req, res) => {
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

bookRoute.get('/getAllBooks',(req, res) => {
  bookController.getAllBooks(req, books => {
    return res.status(200).json(books);
  });
});

bookRoute.get('/cat/:category',(req, res) => {
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

bookRoute.get('/:idBook/authors',(req, res) => {
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

bookRoute.post('/add', (req, res) => {
  console.log("In book route");
  bookController.add(req, book => {
    return res.status(200).json(book);
  })
});

bookRoute.put('/:idBook/edit', (req,res) => {
  bookController.update(req, book => {
    return res.status(200).json(book);
  })
});

bookRoute.delete('/:idBook/deleteWritten', (req,res) => {
  bookController.deleteWritten(req, req.params.idBook, book => {
    return res.status(200).json(book);
  })
});


bookRoute.delete('/:idBook/deleteBook', (req, res) => {
  bookController.deleteBook(req, req.params.idBook, book => {
    return res.status(200).json(book);
  })
});



/*
tagRoutes.put   ('/:id', auth, tag.update_tag);
tagRoutes.delete('/:id', auth, tag.delete_tag);
*/


module.exports = bookRoute;






