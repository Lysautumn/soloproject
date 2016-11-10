const pool = require('../db/connection');

// save title
function saveTitle(id, title, image) {
  return new Promise(function(resolve, reject) {
    pool.connect(function(err, client, done) {
      if(err) {
        done();
        return reject(err);
      }
      client.query('INSERT INTO movies (user_id, title, image) VALUES ($1, $2, $3);', [id, title, image], function(err, result) {
        if(err) {
          return reject(err);
        }
        return resolve(result.rows);
      });
    });
  });
}
module.exports = {
  saveTitle: saveTitle
};
