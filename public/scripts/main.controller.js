angular.module('streamApp').controller('MainController', MainController);

// function for MainController
function MainController(streamapi) {
  var main = this;
  main.titlesArray = [];
  console.log('MainController loaded');
  main.forSearch = function() {
    if(main.movie) {
      streamapi.findMovie(main.search).then(function(movie) {
        main.titlesArray = [];
        movie.forEach(function(element) {
          element.data.poster = element.data.poster_400x570;
          main.titlesArray.push(element.data);
        });
      });
    } else if(main.tv) {
      streamapi.findShow(main.search).then(function(show) {
        main.titlesArray = [];
        console.log(show);
        show.forEach(function(element) {
          main.titlesArray.push(element.data);
        });
      });
    } else {
      alert('Please select format');
    }
  };
}
