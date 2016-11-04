const router = require('express').Router();
const passport = require('passport');

router.post('/', function(req, res) {
  req.logout();
  res.sendStatus(200);
});

module.exports = router;
