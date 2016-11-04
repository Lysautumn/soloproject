const router = require('express').Router();
const pool = require('../db/connection');

// save title
function saveTitle(title, image, url) {
  return new Promise(function(resolve, reject) {
    pool.connect(function(err, client, done) {
      if(err) {
        done();
        return reject(err);
      }
      client.query('INSERT INTO movies (title, image, url) VALUES ($1, $2, $3);', [title, image, url], function(err, result) {
        if(err) {
          return reject(err);
        }
        resolve(result.rows);
      });
    });
  });
}
// display titles


module.exports = router;
