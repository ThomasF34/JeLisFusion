module.exports.getByID = function(req, idPublisher, callback){
  console.log("Preparing insert query");
  req.getConnection(function (err, connection){
    connection.query("SELECT * FROM publisher WHERE idPublisher = ? ", idPublisher, function(err, rows, fields){
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
    connection.query("SELECT * FROM publisher", function(err, rows, fields){
      if(err){
        console.log(err);
        return res.status(500).json("Erreur in getting all publisher");
      }
      callback(rows);
    })
  })
};

module.exports.add = function(req, callback){
  console.log("Preparing insert query");
  let query = 'INSERT INTO publisher (namePublisher) VALUES (?)';
  const values = [
    req.body.namePublisher,
  ];
  req.getConnection(function (err, connection){
    connection.query(query, values, function (err, rows, fields){
      if(err){
        console.log(err);
        return res.status(500).json("Error in adding new publisher");
      }
      console.log("Add-publisher query sent");
      callback(rows);
    })
  });
};

module.exports.update = function(req, callback){
  let query = 'UPDATE publisher SET namePublisher = ? WHERE idPublisher = ?';
  const values = [
    req.body.namePublisher,
    req.body.idPublisher
  ];
  req.getConnection(function (err, connection){
    connection.query(query, values, function (err, rows, fields){
      if(err){
        console.log(err);
        return res.status(500).json("Error in updating publisher");
      }
      console.log("Edit-publisher query sent");
      callback(rows);
    })
  });
};

module.exports.deletePublisher = function(req, idPublisher, callback){
  req.getConnection(function (err, connection){
    connection.query("DELETE FROM publisher WHERE idPublisher = ?", idPublisher, function(err,rows,fiedls){
      if(err){
        console.log(err);
        return res.status(500).json('Error in deleting');
      }
      console.log("Delete-publisher query sent");
      callback(rows);
    })
  })
};

module.exports.updateBook = function(req, idPublisher, callback){
  console.log("J'essaye d'update book");
  req.getConnection(function (err, connection){
    connection.query("UPDATE book SET idPublisher = NULL WHERE idPublisher = ?", idPublisher, function(err,rows,fiedls){
      if(err){
        console.log(err);
        return res.status(500).json('Error in updating');
      }
      console.log("Update-Book query sent");
      callback(rows);
    })
  })
};
