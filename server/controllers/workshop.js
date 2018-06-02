module.exports.getAll = function(req, callback){
  req.getConnection(function (err, connection) {
    connection.query("SELECT * FROM workshop", function(err, rows, fields){
      console.log("query sent");
      if(err){
        console.log(err);
        console.log("Cannot get workshop");
        return res.status(500).json("Error in getting all workshops");
      }
      console.log("Query successfully executed");
      callback(rows);
    });
  })
};

module.exports.getByID = function(req, idWorkshop, callback){
  req.getConnection(function (err, connection) {
    connection.query("SELECT * FROM workshop WHERE idWorkshop = ?", idWorkshop, function(err, rows, fields){
      console.log("query sent");
      if(err){
        console.log(err);
        console.log("Cannot get workshop");
        return res.status(500).json("Error in getting workshop");
      }
      console.log("Query successfully executed");
      callback(rows[0]);
    });
  })
};

module.exports.add = function(req, callback){
  let query = "INSERT INTO workshop (titleWorkshop, dateWorkshop, nbSeat, price, minAge, maxAge, description, nameAnimator) VALUES (?, STR_TO_DATE(?,'%d/%m/%Y à %H:%i:%s'), ?, ?, ?, ?, ?, ?)";
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

module.exports.update = function(req, callback){
  let query = "UPDATE workshop SET  titleWorkshop = ?, dateWorkshop = STR_TO_DATE(?,'%d/%m/%Y à %H:%i:%s'), nbSeat = ?, price = ?, minAge = ?, maxAge = ?, description = ?, nameAnimator = ? WHERE idWorkshop = ?";
  const value = [
    req.body.titleWorkshop,
    req.body.dateWorkshop,
    trueValue(req.body.nbSeat),
    trueValue(req.body.price),
    trueValue(req.body.minAge),
    trueValue(req.body.maxAge),
    trueValue(req.body.description),
    req.body.nameAnimator,
    req.body.idWorkshop
  ];
  req.getConnection(function (err, connection) {
      connection.query(query, value, function (err, rows, fields){
        if(err){
          console.log(err);
          return res.status(500).json("Error in adding new workshop");
        }
        console.log("Edit-workshop query sent");
        callback(rows);
      })
    }
  )
};

module.exports.delete = function(req, idWorkshop, callback){
  req.getConnection(function (err, connection){
    connection.query("DELETE FROM workshop WHERE idWorkshop = ?", idWorkshop, function(err,rows,fiedls){
      if(err){
        console.log(err);
        return res.status(500).json('Error in deleting');
      }
      console.log("Delete-workshop query sent")
      callback(rows);
    })
  })
};

function trueValue(string){
  if(string === ''){
    return null;
  } else {
    return string;
  }
}
