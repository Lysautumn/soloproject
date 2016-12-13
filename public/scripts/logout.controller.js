angular.module('streamApp').controller('LogoutController', LogoutController);

function LogoutController($http, $location) {
  var main = this;
  // function to log out user
  main.logout = function() {
    $http.post('/logout', {
    }).then(function() {
      $location.path('/');
      main.titlesArray = [];
      main.netflixArray = [];
      main.streamArray = [];
    }, function(error) {
      console.log('Error logging out', error);
    });
  };
}
