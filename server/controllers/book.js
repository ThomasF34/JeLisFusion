
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
    connection.query("select idBook, titleBook, ISBN, summary, srcImage, price, nbStock, personnalizedWord, trends, nameCategory, namePublisher FROM Book B, Category C, Publisher P WHERE B.idCategory = C.idCategory AND B.idPublisher = P.idPublisher;", function(err, rows, fields) {
      console.log("Query sent");
      if (err) {
        console.log (err);
        console.log("Cannot get books");
        return res.status(300).json("Cannot get books");
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
      connection.query("select idBook, titleBook, ISBN, summary, srcImage, price, nbStock, personnalizedWord, trends, nameCategory, namePublisher FROM Book B, Category C, Publisher P WHERE B.idBook = " + idBook + " AND B.idCategory = C.idCategory AND B.idPublisher = P.idPublisher;", function (err, rows, fields) {
        console.log("Query sent");
        if (err) {
          console.log(err);
          console.log('Cannot get book #'+idBook);
          return res.status(300).json('Cannot get book #'+idBook);
        }
        console.log("Query successfully executed");
        //Retourner à la route
        callback(rows[0]);
      });
    });
};

module.exports.getBookByCat = function(req, category, callback){
  //La requete
  req.getConnection(function (err, connection) {
    //
    connection.query("select idBook, titleBook, ISBN, summary, srcImage, price, nbStock, personnalizedWord, trends, nameCategory, namePublisher FROM Book B, Category C, Publisher P WHERE C.nameCategory = '" + category + "' AND B.idCategory = C.idCategory AND B.idPublisher = P.idPublisher;", function (err, rows, fields) {
      console.log("Query sent");
      if (err) {
        console.log(err);
        console.log('Cannot get book from '+category);
        return res.status(300).json('Cannot get book from'+ category);
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
    connection.query("select A.nameAuthor, A.fNameAuthor from Written W, Author A WHERE W.idBook = " +idBook + " AND A.idAuthor = W.idAuthor;", function (err, rows, fields) {
      console.log("Query sent");
      if (err) {
        console.log(err);
        console.log('Cannot get authors of book #'+idBook);
        return res.status(300).json('Cannot get authors of book #'+idBook);
      }
      console.log("Query successfully executed");
      //Retourner à la route
      callback(rows);
    });
  });
};
