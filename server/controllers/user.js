module.exports.register = function(req, callback){
  console.log("Preparing insert query");
  let query = "INSERT INTO users (nameUser, fNameUser, password, email) VALUES ( ?, ?, ?, ?);"
  const values = [
    req.body.nameUser,
    req.body.fNameUser,
    req.body.password,
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
    connection.query("SELECT idUser,email, password from users where email = ?", req.body.email, function (err, rows, fields) {
      if (err) {
        console.log(err);
        return res.status(500).json("Error in register");
      }
      console.log("Login query sent");
      callback(rows[0]);
    })
  })
}

