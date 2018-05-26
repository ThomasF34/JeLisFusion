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
