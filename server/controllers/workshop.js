module.exports.getAll = function(req, callback){
  req.getConnection(function (err, connection) {
    connection.query("SELECT * FROM Workshop", function(err, rows, fields){
      console.log("query sent");
      if(err){
        console.log(err);
        console.log("Cannot get book");
      }
      console.log("Query successfully executed");
      callback(rows);
    });
  })
};

