const pool = require('../db/connection');

// save title
function saveTitle(id, title, image) {
  return new Promise(function(resolve, reject) {
    pool.connect(function(err, client, done) {
      if(err) {
        done();
        return reject(err);
      }
      client.query('INSERT INTO favorites (user_id, title, image) VALUES ($1, $2, $3);', [id, title, image], function(err, result) {
        if(err) {
          return reject(err);
        }
        return resolve(result.rows);
      });
    });
  });
}
// get saves
function getTitles(id) {
  return new Promise(function(resolve, reject) {
    pool.connect(function(err, client, done) {
      if(err) {
        done();
        console.log('Error in getTitles', err);
        return reject(err);
      }
      client.query('SELECT title, image FROM favorites JOIN solo_users ON favorites.user_id=solo_users.id WHERE solo_users.id=$1;', [id], function(err, result) {
        done();
        if(err) {
          console.log('Error in client.query');
          return reject(err);
        }
        console.log(result.rows);
        return resolve(result.rows);
      });
    });
  });
}
module.exports = {
  saveTitle: saveTitle,
  getTitles: getTitles
};
