var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/user');
var userId;

exports.setup = function() {
  passport.use('local', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password'
  }, findAndComparePassword));

  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id).then(function(user) {
      done(null, user);
    }).catch(function(err) {
      done(err);
    });
  });
};

function findAndComparePassword(username, password, done) {
  User.findByUsername(username).then(function(user) {
    if(!user) {
      return done(null, false);
    }
    User.comparePassword(user, password).then(function(isMatch) {
      if(isMatch) {
        done(null, user);
      } else {
        done(null, false);
      }
    });
  }).catch(function(err) {
    console.log('Error finding user', err);
    done(err);
  });
}
