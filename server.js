require('dotenv').config();
var express = require('express');
var bodyParser = require('body-parser');
var connection = require('./db/connection');
var path = require('path');
var pg = require('pg');
var user = require('./models/user');

// routes for logging in and registering user
var login = require('./routes/login');
var register = require('./routes/register');
var logout = require('./routes/logout');
var save = require('./routes/save');
var auth = require('./passport/setup');
var passport = require('passport');
var session = require('express-session');

var sessionConfig = {
  secret: 'secret',
  key: 'key',
  resave: true,
  saveUninitialized: true,
  cookie: {
    maxAge: 30 * 60 * 1000,
    secure: false
  }
};

connection.connect();
auth.setup();

var app = express();

app.use(session(sessionConfig));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));
app.use(passport.initialize());
app.use(passport.session());

app.use('/register', register);
app.use('/login', login);
app.use('/logout', logout);
app.use('/save', save);

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'public/views/index.html'));
});

app.use(ensureAuthenticated);

function ensureAuthenticated(req, res, next) {
  if(req.isAuthenticated) {
    next();
  } else {
    res.sendStatus(401);
  }
}

var port = process.env.PORT || 3000;

app.listen(port, function() {
  console.log('Listening on port', port);
});
