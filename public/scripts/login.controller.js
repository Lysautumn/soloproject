angular.module('streamApp').controller('LoginController', LoginController);

// function for login controller
function LoginController($http, $location) {
  console.log('LoginController loaded');
  var main = this;
  main.login = function() {
    console.log('Logging user in');
    // for logging in
    $http.post('/login', {
      username: main.username,
      password: main.password
    }).then(function() {
      $location.path('/landing');
    }, function(error) {
      console.log('Error logging in', error);
      $location.path('/');
      alert('There was a problem logging in, please try again!');
    });
  };
}
