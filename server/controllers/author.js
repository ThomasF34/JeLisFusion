module.exports.getAllAuthors = function(req, callback) {
  //La requete
  req.getConnection(function (err, connection) {
    //
    connection.query("select * from author", function(err, rows, fields) {
      console.log("Query sent");
      if (err) {
        console.log (err);
        console.log("Cannot get authors");
        return res.status(500).json("Cannot get authors");
      }
      console.log("Query successfully executed");
      //Retourner à la route
      callback(rows);
    });
  });
};


module.exports.add = function(req, callback){
  console.log("Preparing insert query");
  let query = 'INSERT INTO author (nameAuthor, fNameAuthor) VALUES (?,?)';
  const values = [
    req.body.nameAuthor,
    req.body.fNameAuthor
  ];
  req.getConnection(function (err, connection){
    connection.query(query, values, function (err, rows, fields){
      if(err){
        console.log(err);
        return res.status(500).json("Error in adding new author");
      }
      console.log("Add-author query sent");
      callback(rows);
    })
  });
};

module.exports.get = function(req, idAuthor,  callback){
  req.getConnection(function (err, connection){
    connection.query('SELECT * FROM author WHERE idAuthor = ?', idAuthor, function (err, rows, fields){
      if(err){
        console.log(err);
        console.log('Cannot get author #'+idAuthor);
        return res.status(500).json("Error in adding new author");
      }
      console.log("Query sent");
      callback(rows[0]);
    })
  });
};

module.exports.update = function(req, callback){
  let query = 'UPDATE author SET nameAuthor = ?, fNameAuthor = ? WHERE idAuthor = ?';
  const values = [
    req.body.nameAuthor,
    req.body.fNameAuthor,
    req.body.idAuthor
  ];
  req.getConnection(function (err, connection){
    connection.query(query, values, function (err, rows, fields){
      if(err){
        console.log(err);
        return res.status(500).json("Error in updating new author");
      }
      console.log("Edit-author query sent");
      callback(rows);
    })
  });
};

module.exports.deleteAuthor = function(req, idAuthor, callback){
  req.getConnection(function (err, connection){
    connection.query("DELETE FROM author WHERE idAuthor = ?", idAuthor, function(err,rows,fiedls){
      if(err){
        console.log(err);
        return res.status(500).json('Error in deleting');
      }
      console.log("Delete-author query sent");
      callback(rows);
    })
  })
};

module.exports.deleteWritten = function(req, idAuthor, callback){
  req.getConnection(function (err, connection){
    connection.query("DELETE FROM written WHERE idAuthor = ?", idAuthor, function(err,rows,fiedls){
      if(err){
        console.log(err);
        return res.status(500).json('Error in deleting');
      }
      console.log("Delete-Written query sent");
      callback(rows);
    })
  })
};
