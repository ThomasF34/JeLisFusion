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

module.exports.add = function(req, callback){
  let query = "INSERT INTO workshop (titleWorkshop, dateWorkshop, nbSeat, price, minAge, maxAge, description, nameAnimator) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
  const value = [
    req.body.titleWorkshop,
    req.body.dateWorkshop,
    trueValue(req.body.nbSeat),
    trueValue(req.body.price),
    trueValue(req.body.minAge),
    trueValue(req.body.maxAge),
    trueValue(req.body.description),
    req.body.nameAnimator
  ]
  req.getConnection(function (err, connection) {
    connection.query(query, value, function (err, rows, fields){
      if(err){
        console.log(err);
        return res.status(500).json("Error in adding new workshop");
      }
      console.log("Add-workshop query sent");
      callback(rows);
    })
    }
  )
};


function trueValue(string){
  if(string === ''){
    return null;
  } else {
    return string;
  }
}
