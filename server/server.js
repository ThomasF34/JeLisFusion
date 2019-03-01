var express = require('express'),
  // server.js
  path = require('path'),
  bodyParser = require('body-parser'),
  cors = require('cors'),
  morgan = require('morgan'),
  passport = require('passport'),
  mysql = require('mysql');


const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(cors());
app.use(passport.initialize());

const port = process.env.PORT || 4000;

//Enter DB information here !! 
conn = {
    host: 'localhost',
    user: '',
    password:'',
    database:''
};

myConnection = require('express-myconnection');
app.use(myConnection(mysql, conn, 'single'));

/*conn.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    conn.query("SELECT * FROM book", function (err, result) {
      if (err) throw err;
      console.log(result);
    });
  });*/


// Api -> On renvoie vers le routeur
var api = require('./routes/router');
app.use('/api/',api);



//Repertoire de travail compil??
app.use(express.static(path.join(__dirname, '../dist/KidsWorld/')));

app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, '../dist/KidsWorld/index.html'));
});

const server = app.listen(port, function () {
  console.log('Listening on port ' + port);
});
