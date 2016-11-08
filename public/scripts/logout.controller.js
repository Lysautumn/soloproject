angular.module('streamApp').controller('LogoutController', LogoutController);

function LogoutController($http, $location) {
  console.log('LogoutController loaded');
  var main = this;
  main.logout = function() {
    console.log('Logging user out');
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
