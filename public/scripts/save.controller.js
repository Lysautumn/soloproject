angular.module('streamApp').controller('SaveController', SaveController);

// function for save controller
function SaveController($http, $location, streamapi) {
  console.log('SaveController loaded');
  var main = this;
  main.allResults = streamapi.allResults;
  main.save = function(index) {
    console.log('Saving title information');
    console.log('main.id', main.id);
    console.log('streamapi', main.allResults);
    console.log('main.poster', main.poster);
    // $http.post('/save', {
    //   user_id: main.id,
    //   title: main.title,
    //   image: main.poster
    // }).then(function() {
    //   $location.path('/landing');
    //   alert('Title saved');
    // }, function(error) {
    //   console.log('Error saving to DB', error);
    // });
  };
}
