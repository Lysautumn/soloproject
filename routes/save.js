var router = require('express').Router();
var Saved = require('../models/saved');

// add new info when someone saves
router.post('/', function(req, res) {
  console.log('Saving information');
  Saved.saveTitle(req.body.user_id, req.body.title, req.body.poster).then(function() {
    res.sendStatus(201);
  }).catch(function(err) {
    console.log('Error in /save', err);
    res.sendStatus(500);
  });
});

module.exports = router;
