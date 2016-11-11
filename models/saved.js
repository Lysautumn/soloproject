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
// get saves
function getTitles(id) {
  console.log('In getTitles');
  return new Promise(function(resolve, reject) {
    console.log('in promise, about to connect');
    pool.connect(function(err, client, done) {
      console.log('connnected');
      if(err) {
        done();
        console.log('Error in getTitles', err);
        return reject(err);
      }
      console.log('about to run query');
      client.query('SELECT title, image FROM movies JOIN solo_users ON movies.user_id=solo_users.id WHERE solo_users.id=$1;', [id], function(err, result) {
        console.log('query finished');
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
