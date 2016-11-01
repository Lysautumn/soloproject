angular.module('streamApp').controller('MainController', MainController);

// function for MainController
function MainController(streamapi) {
  var main = this;
  console.log('MainController loaded');
  main.forSearch = function() {
    if(main.movie) {
      streamapi.findMovie(main.search);
    } else {
      streamapi.findShow(main.search);
    }
  };
}
