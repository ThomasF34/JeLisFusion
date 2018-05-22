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
    connection.query("select * from book", function(err, rows, fields) {
      console.log("Query sent");
      if (err) {
        console.log (err);
        console.log('Impossible de récupérer les élèves');
        return res.status(300).json("Impossible de récupérer vos élèves");
      }
      console.log("Requete effectuée");
      //Retourner à la route
      callback(rows);
    });
  });
};
