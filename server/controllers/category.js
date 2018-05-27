module.exports.getAll = function(req, callback){
  console.log("Preparing query");
  req.getConnection(function (err, connection){
    connection.query("SELECT * FROM CATEGORY", function(err, rows, fields){
      if(err){
        console.log(err);
        return res.status(500).json("Erreur in getting all categories");
      }
      console.log("Get query sent");
      callback(rows);
    })
  })
}

module.exports.getByID = function(req, idCategory, callback){
  console.log("Preparing insert query");
  req.getConnection(function (err, connection){
    connection.query("SELECT * FROM CATEGORY WHERE idCategory = ? ", idCategory, function(err, rows, fields){
      if(err){
        console.log(err);
        return res.status(500).json("Erreur in getting category");
      }
      console.log((rows[0]));
      callback(rows[0]);
    })
  })
}
