module.exports.getByID = function(req, idPublisher, callback){
  console.log("Preparing insert query");
  req.getConnection(function (err, connection){
    connection.query("SELECT * FROM Publisher WHERE idPublisher = ? ", idPublisher, function(err, rows, fields){
      if(err){
        console.log(err);
        return res.status(500).json("Erreur in getting publisher");
      }
      console.log((rows[0]));
      callback(rows[0]);
    })
  })
};

module.exports.getAll = function(req, callback){
  console.log("Preparing query");
  req.getConnection(function (err, connection){
    connection.query("SELECT * FROM Publisher", function(err, rows, fields){
      if(err){
        console.log(err);
        return res.status(500).json("Erreur in getting all publisher");
      }
      callback(rows);
    })
  })
}
