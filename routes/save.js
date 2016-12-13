var router = require('express').Router();
var Saved = require('../models/saved');

// add new info when someone saves
router.post('/', function(req, res) {
  Saved.saveTitle(req.user.id, req.body.title, req.body.image).then(function() {
    res.sendStatus(201);
  }).catch(function(err) {
    console.log('Error in /save', err);
    res.sendStatus(500);
  });
});

// display saved info
router.get('/', function(req, res) {
  Saved.getTitles(req.user.id).then(function(result) {
    res.send(result);
  }).catch(function(err) {
    console.log('Error in /save', err);
    res.sendStatus(500);
  });
});

module.exports = router;
