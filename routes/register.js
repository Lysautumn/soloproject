var router = require('express').Router();
var User = require('../models/user');

// add new info when someone registers
router.post('/', function(req, res) {
  console.log('Registering new user');
  User.create(req.body.name, req.body.email, req.body.username, req.body.password).then(function() {
    res.sendStatus(201);
  }).catch(function(err) {
    console.log('Error in /register', err);
    res.sendStatus(500);
  });
});

module.exports = router;
