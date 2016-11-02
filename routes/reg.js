var router = require('express').Router;
var pg = require('pg');

var config = {
  database: rho,
};

var pool = new pg.Pool(config);

// add new info when someone registers
router.post('/register', function (req, res) {
  pool.connect(function (err, client, done) {
    if (err) {
      console.log('Error connecting to the DB', err);
      res.sendStatus(500);
      done();
      return;
    }

    client.query('INSERT INTO solo_users (name, email, username, password) VALUES ($1, $2, $3, $4) RETURNING *;', [req.body.name, req.body.email, req.body.username, req.body.password], function (err, result) {
      done();
      if (err) {
        console.log('Error querying the DB', err);
        res.sendStatus(500);
        return;
      }

      console.log('Got rows from the DB:', result.rows);
      res.send(result.rows);
    });
  });
});

// update info in settings
