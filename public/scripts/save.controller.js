angular.module('streamApp').controller('SaveController', SaveController);

function SaveController($http, $location) {
  console.log('SaveController loaded');
  var main = this;
  main.save = function(element) {
    $http.post('/save', {
      title: element.data.title,
      image: element.data.poster_400x570,
      url: element.data.subscription_web_sources
    }).then(function() {
      $location.path('/landing');
      alert('Title saved');
    }, function(error) {
      console.log('Error saving to DB');
    });
  };
}
