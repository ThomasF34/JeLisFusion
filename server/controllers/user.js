

const bcrypt = require('bcrypt');

module.exports.register = function(req, callback){
  console.log("Preparing insert query");
  let query = "INSERT INTO users (nameUser, fNameUser, password, email) VALUES ( ?, ?, ?, ?);"
  const values = [
    req.body.nameUser,
    req.body.fNameUser,
    bcrypt.hashSync(req.body.password,bcrypt.genSaltSync(7)),
    req.body.email
  ];
  req.getConnection(function (err, connection){
    connection.query(query, values, function (err, rows, fields){
      if(err){
        console.log(err);
        return res.status(500).json("Error in register");
      }
      console.log("Registering query sent");
      callback(rows);
    })
  })
}

module.exports.loginUser =  function(req, callback) {
  req.getConnection(function (err, connection) {
    connection.query("SELECT idUser,email, password, admin from users where email = ?", req.body.email, function (err, rows, fields) {
      if (err) {
        console.log(err);
        return res.status(500).json("Error in register");
      }
      console.log("Login query sent");
      callback(rows[0]);
    })
  })
}

module.exports.isAdmin = function(req, idUser, callback){
  req.getConnection(function (err,connection){
    connection.query("SELECT admin FROM users WHERE idUser = ?", idUser, function (err, rows, fields) {
        if (err) {
          console.log(err);
          return res.status(500).send("Error in DB request");
        }
        if(rows[0] === undefined){
          callback(false);
        } else {
          callback(rows[0].admin);
        }
    });
  });
};

/*module.exports.getAdmin = function(req, callback){
  req.getConnection(function (err,connection){
    connection.query("SELECT admin FROM users WHERE idUser = ?", idUser, function (err, rows, fields) {
      if (err) {
        console.log(err);
        return res.status(500).send("Error in DB request");
      }
      console.log(rows[0].admin);
      callback(rows[0].admin);
    });
  });
};*/

module.exports.get = function(req, idUser, callback){
  req.getConnection(function (err,connection){
    connection.query("SELECT idUser, nameUser, fNameUser, email FROM users WHERE idUser = ?", idUser, function (err, rows, fields) {
      if (err) {
        console.log(err);
        return res.status(500).send("Error in DB request");
      }
      callback(rows[0]);
    });
  })
}
