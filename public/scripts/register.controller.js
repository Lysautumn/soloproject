angular.module('streamApp').controller('RegisterController', RegisterController);

// function for registration controller
function RegisterController($http, $location) {
  var main = this;
  main.register = function() {
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
