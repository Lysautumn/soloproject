angular.module('streamApp').controller('MainController', MainController);

// function for MainController
function MainController(streamapi) {
  var main = this;
  console.log('MainController loaded');
  main.forSearch = function() {
    if(main.movie) {
      streamapi.findMovie(main.search);
    } else if(main.tv) {
      streamapi.findShow(main.search);
    } else {
      alert('Please select format');
    }
  };
}
function appendDom(title) {
  var main = this;
  main.titlesArray = [];
  main.titlesArray = title;
}
