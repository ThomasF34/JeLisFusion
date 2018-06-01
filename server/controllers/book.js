// list of the error messages
let UNAUTHORIZED_USER = "Unauthorized user";
let NOT_FOUND = "Student not found";


/**
 * get_all
 *
 * get all the tags
 * @param req : get request, without params.
 *
 * @return Json with all the questions.
 */
module.exports.getAllBooks = function(req, callback) {
  //La requete
  req.getConnection(function (err, connection) {
    //
    connection.query("select idBook, titleBook, ISBN, summary, cover, price, nbStock, personnalizedWord, trends, nameCategory FROM book B, category C WHERE B.idCategory = C.idCategory", function(err, rows, fields) {
      console.log("Query sent");
      if (err) {
        console.log (err);
        console.log("Cannot get books");
        return res.status(500).json("Cannot get books");
      }
      console.log("Query successfully executed");
      //Retourner à la route
      callback(rows);
    });
  });
};

module.exports.getAllAuthors = function(req, callback) {
  //La requete
  req.getConnection(function (err, connection) {
    //
    connection.query("select * FROM Author", function(err, rows, fields) {
      console.log("Query sent");
      if (err) {
        console.log (err);
        console.log("Cannot get authors");
        return res.status(500).json("Cannot get books");
      }
      console.log("Query successfully executed");
      //Retourner à la route
      callback(rows);
    });
  });
};

module.exports.getBookByID = function(req, idBook, callback){
    //La requete
    req.getConnection(function (err, connection) {
      //
      connection.query("select idBook, titleBook, ISBN, summary, cover, price, nbStock, personnalizedWord, trends, idCategory, idPublisher FROM Book B WHERE B.idBook = ?" , idBook , function (err, rows, fields) {
        console.log("Query sent");
        if (err) {
          console.log(err);
          console.log('Cannot get book #'+idBook);
          return res.status(500).json('Cannot get book #'+idBook);
        }
        console.log("Query successfully executed");
        //Retourner à la route
        callback(rows[0]);
      });
    });
};

module.exports.getBooksByCat = function(req, idCategory, callback){
  //La requete
  req.getConnection(function (err, connection) {
    //
    connection.query("select * FROM Book B WHERE B.idCategory = ? ", idCategory, function (err, rows, fields) {
      console.log("Query sent");
      if (err) {
        console.log(err);
        console.log('Cannot get book from '+ idCategory);
        return res.status(500).json('Cannot get book from'+ idCategory);
      }
      console.log("Query successfully executed");
      //Retourner à la route
      callback(rows);
    });
  });
};

module.exports.getAuthorsByBookID = function(req, idBook, callback){
  //La requete
  req.getConnection(function (err, connection) {
    //
    connection.query("select A.idAuthor, A.nameAuthor, A.fNameAuthor from Written W, Author A WHERE W.idBook = ? AND A.idAuthor = W.idAuthor;", idBook , function (err, rows, fields) {
      console.log("Query sent");
      if (err) {
        console.log(err);
        console.log('Cannot get authors of book #'+idBook);
        return res.status(500).json('Cannot get authors of book #'+idBook);
      }
      console.log("Query successfully executed");
      //Retourner à la route
      callback(rows);
    });
  });
};

module.exports.update = function(req, callback){
  let query = 'UPDATE book SET titleBook = ?, ISBN = ?, summary = ?, cover = ?, price = ?, nbStock = ?, personnalizedWord = ?, trends = ?, idCategory = ?, idPublisher = ? WHERE idBook = ?';
  const values = [
    req.body.titleBook,
    trueValue(req.body.ISBN),
    trueValue(req.body.summary),
    "TEST COVER",
    trueValue(req.body.price),
    trueValue(req.body.nbStock),
    trueValue(req.body.personnalizedWord),
    trueValue(req.body.trends),
    req.body.idCategory,
    req.body.idPublisher,
    req.body.idBook
  ];
  req.getConnection(function (err, connection){
    connection.query(query, values, function (err, rows, fields){
      if(err){
        console.log(err);
        return res.status(500).json("Error in adding new book");
      }
      console.log("Edit-book query sent");
      callback(rows);
    })
  });
};

module.exports.add = function(req, callback){
  console.log("Preparing insert query");
  let query = 'INSERT INTO book (titleBook, ISBN, summary, cover, price, nbStock, personnalizedWord, trends, idCategory, idPublisher) values (?,?,?,?,?,?,?,?,?,?)';
  console.log(req.body);
  const values = [
    req.body.titleBook,
    trueValue(req.body.ISBN),
    trueValue(req.body.summary),
    "TEST COVER",
    trueValue(req.body.price),
    trueValue(req.body.nbStock),
    trueValue(req.body.personnalizedWord),
    trueValue(req.body.trends),
    req.body.idCategory,
    req.body.idPublisher
  ];
  console.log(values);
  req.getConnection(function (err, connection){
    connection.query(query, values, function (err, rows, fields){
      if(err){
        console.log(err);
        return res.status(500).json("Error in adding new book");
      }
      console.log("Add-book query sent");
      callback(rows);
    })
  });
};

module.exports.addWritten = function(req, callback){
  console.log("Preparing insert query");
  const values = [];
  let query = "INSERT INTO written (idAuthor, idBook) VALUES "
  req.body.authors.forEach(function(author, index, array){
    //If it's the last occurence
    if(index === array.length-1){
      //we dont add any column at the end
      query += '(? , ?)';
    } else {
      query += '(?, ?),';
    }
    values.push(author.idAuthor);
    values.push(req.body.idBook);
  });
  req.getConnection(function (err, connection){
    connection.query(query, values, function (err, rows, fields){
      if(err){
        console.log(err);
        return res.status(500).json("Error in adding new written");
      }
      console.log("Add-written query sent");
      callback(rows);
    })
  });
};

function trueValue(string){
  if(string === ''){
    return null;
  } else {
    return string;
  }
}

module.exports.deleteBook = function(req, idBook, callback){
  req.getConnection(function (err, connection){
    connection.query("DELETE FROM book WHERE idBook = ?", idBook, function(err,rows,fiedls){
      if(err){
        console.log(err);
        return res.status(500).json('Error in deleting');
      }
      console.log("Delete-book query sent")
      callback(rows);
    })
  })
};

module.exports.deleteWritten = function(req, idBook, callback){
  req.getConnection(function (err, connection){
    connection.query("DELETE FROM written WHERE idBook = ?", idBook, function(err,rows,fiedls){
      if(err){
        console.log(err);
        return res.status(500).json('Error in deleting');
      }
      console.log("Delete-Written query sent")
      callback(rows);
    })
  })
};
