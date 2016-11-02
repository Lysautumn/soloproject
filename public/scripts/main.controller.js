angular.module('streamApp').controller('MainController', MainController);

// function for MainController
function MainController(streamapi) {
  var main = this;
  var titlesArray = [];
  console.log('MainController loaded');
  main.forSearch = function() {
    if(main.movie) {
      streamapi.findMovie(main.search).then(function(movie) {
        titlesArray = [];
        movieReq.forEach(titlesArray.push());
      });
    } else if(main.tv) {
      streamapi.findShow(main.search).then(function(show) {
        titlesArray = [];
        showReq.forEach(titlesArray.push());
      });
    } else {
      alert('Please select format');
    }
  };
}
