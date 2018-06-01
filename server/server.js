var express = require('express'),
  // server.js
  path = require('path'),
  bodyParser = require('body-parser'),
  cors = require('cors'),
  cool = require('cool-ascii-faces');

  //userRoutes = require('./router/userRoutes'),
  //accountRoutes = require('./router/accountRoutes'),

  morgan = require('morgan'),
  passport = require('passport'),
  mysql = require('mysql');


const app = express();
app.get('/cool', (req, res) => res.send(cool()));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(cors());
app.use(passport.initialize());

const port = process.env.PORT || 4000;

//BD

conn = {
    host: 'zf4nk2bcqjvif4in.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
    user: 'jibn0aalcjylxqqy',
    password:'lv0v632dnb78unky',
    database:'caezo7u315ex3xmj'
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
