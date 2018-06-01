module.exports.getAllParticipateFromWorkshop = function(req, idWorkshop, callback){
  //La requete
  req.getConnection(function (err, connection) {
    //
    connection.query("select * from participate where idWorkshop = ?" , idWorkshop , function (err, rows, fields) {
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
    connection.query("select * from participate where idUser = ?" , idUser , function (err, rows, fields) {
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
