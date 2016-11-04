angular.module('streamApp').controller('RegisterController', RegisterController);

// function for registration controller
function RegisterController($http, $location) {
  console.log('RegisterController loaded');
  var main = this;
  main.register = function() {
    console.log('Registering new user');
    $http.post('/register', {
      name: main.name,
      email: main.email,
      username: main.username,
      password: main.password
    }).then(function() {
      $location.path('/');
      alert('Success! Please log in!');
    }, function(error) {
      alert('Please make sure to enter a unique username and email');
      console.log('Error registering:', error);
    });
  };
}
