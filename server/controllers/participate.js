module.exports.getAllParticipateFromWorkshop = function(req, idWorkshop, callback){
  //La requete
  req.getConnection(function (err, connection) {
    //
    connection.query("select idWorkshop, p.idUser, nbSeat, nameUser, fNameUser from participate p, users u where p.idWorkshop = ? AND p.idUser = u.idUser" , idWorkshop , function (err, rows, fields) {
      console.log("Query sent");
      if (err) {
        console.log(err);
        return res.status(500).json('Cannot get participate of workshop #'+idWorkshop);
      }
      console.log("Query successfully executed");
      //Retourner à la route
      callback(rows);
    });
  });
};

module.exports.getAllParticipateFromUser = function(req, idUser, callback){
  //La requete
  req.getConnection(function (err, connection) {
    //
    connection.query("select p.idWorkshop, p.idUser, p.nbSeat, w.titleWorkshop, w.dateWorkshop, w.price from participate p, workshop w where p.idUser = ? AND p.idWorkshop = w.idWorkshop" , idUser , function (err, rows, fields) {
      console.log("Query sent");
      if (err) {
        console.log(err);
        return res.status(500).json('Cannot get participate of user #'+idUser);
      }
      console.log("Query successfully executed");
      //Retourner à la route
      callback(rows);
    });
  });
};

module.exports.getTakenSeat = function(req, idWorkshop, callback){
  //La requete
  req.getConnection(function (err, connection) {
    //
    connection.query("select sum(nbSeat) as nbTakenSeat from participate where idWorkshop = ?" , idWorkshop , function (err, rows, fields) {
      if(rows[0].nbTakenSeat === null){
        rows[0] = {nbTakenSeat : 0};
      }
      console.log("Query sent");
      if (err) {
        console.log(err);
        return res.status(500).json('Cannot get nbRemainingSeat of user #'+idUser);
      }
      console.log("Query successfully executed");
      //Retourner à la route
      callback(rows[0].nbTakenSeat);
    });
  });
};

module.exports.create = function(req, callback){
  //La requete
  req.getConnection(function (err, connection) {
    //
    connection.query("select nbSeat from participate where idWorkshop = ? AND idUser = ?", [req.body.idWorkshop, req.idUser], function(err, rows, fields) {
      if (err) {
        console.log(err);
        return res.status(500).json('Cannot create new participate');
      };
      if (rows[0] !== undefined) {
        callback(undefined);
      } else {
        connection.query("insert into participate values (?,?,?)", [req.body.idWorkshop, req.idUser, req.body.nbSeatToBook], function (err, rows, fields) {
          console.log("Query sent");
          if (err) {
            console.log(err);
            return res.status(500).json('Cannot create new participate');
          }
          console.log("Query successfully executed");
          //Retourner à la route
          callback(rows);
        });
      }
    });
  });
};


module.exports.deleteParticular = function(req, idWorkshop, idUser, callback){
  //La requete
  req.getConnection(function (err, connection) {
    //
    connection.query("DELETE FROM participate WHERE idWorkshop = ? AND idUser = ?", [idWorkshop, idUser]  , function (err, rows, fields) {
      console.log("Query sent");
      if (err) {
        console.log(err);
        return res.status(500).json('Cannot get participate of workshop #'+idWorkshop + "by user "+idUser);
      }
      console.log("Query successfully executed");
      //Retourner à la route
      callback(rows);
    });
  });
};

module.exports.deleteFromWksp = function(req, idWorkshop, callback){
  //La requete
  req.getConnection(function (err, connection) {
    //
    connection.query("DELETE FROM participate WHERE idWorkshop = ?", idWorkshop , function (err, rows, fields) {
      console.log("Query sent");
      if (err) {
        console.log(err);
        return res.status(500).json('Cannot get participate of workshop #'+idWorkshop);
      }
      console.log("Query successfully executed");
      //Retourner à la route
      callback(rows);
    });
  });
};

