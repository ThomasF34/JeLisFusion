
// Modules
const express = require('express');
const bookRoute = express.Router();

const token = require('./token');

//Call for controller
const bookController = require('../controllers/book');

bookRoute.get('/getRandom', (req, res) => {
  bookController.getRandom(req, book => {
    return res.status(200).json(book);
  })
});


bookRoute.get('/getBookByID/:idBook', (req, res) => {
  console.log('Demande un seul book');
  bookController.getBookByID(req, req.params.idBook, book => {
    if(book === undefined){
      return res.status(404).json(book);
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

bookRoute.get('/cat/:idCategory',(req, res) => {
  console.log('Demande une categorie');
  bookController.getBooksByCat(req, req.params.idCategory, books => {
    if(books === undefined){
      return res.status(404).json(books);
    } else {
      return res.status(200).json(books);
    }
  });
});

bookRoute.get('/:idBook/authors',(req, res) => {
  console.log('Asking for authors');
  bookController.getAuthorsByBookID(req, req.params.idBook, authors => {
    if(authors === undefined){
      return res.status(404).json(authors);
    } else {
      return res.status(200).json(authors);
    }
  });
});

bookRoute.post('/addWritten', token.verifyAdmin, (req, res) => {
  bookController.addWritten(req, back => {
    return res.status(200);
  })
})

bookRoute.post('/add', token.verifyAdmin, (req, res) => {
  console.log("In book route");
  bookController.add(req, book => {
    return res.status(200).json(book);
  })
});

bookRoute.put('/:idBook/edit',token.verifyAdmin, (req,res) => {
  bookController.update(req, book => {
    return res.status(200).json(book);
  })
});

bookRoute.delete('/:idBook/deleteWritten',token.verifyAdmin, (req,res) => {
  bookController.deleteWritten(req, req.params.idBook, book => {
    return res.status(200).json(book);
  })
});


bookRoute.delete('/:idBook/deleteBook',token.verifyAdmin, (req, res) => {
  bookController.deleteBook(req, req.params.idBook, book => {
    return res.status(200).json(book);
  })
});



/*
tagRoutes.put   ('/:id', auth, tag.update_tag);
tagRoutes.delete('/:id', auth, tag.delete_tag);
*/


module.exports = bookRoute;






