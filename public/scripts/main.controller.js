angular.module('streamApp').controller('MainController', MainController);

// function for MainController
function MainController(streamapi) {
  var main = this;
  // establish titlesArray for search results
  main.titlesArray = [];
  console.log('MainController loaded');
  main.forSearch = function() {
    // if movie radio is clicked
    if(main.movie) {
      streamapi.findMovie(main.search).then(function(movie) {
        // empty titles array for new results
        main.titlesArray = [];
        // display information for each movie returned in the search
        movie.forEach(function(element) {
          element.data.poster = element.data.poster_400x570;
          main.titlesArray.push(element.data);
        });
      });
      // if tv radio is clicked
    } else if(main.tv) {
      streamapi.findShow(main.search).then(function(show) {
        // empty titles array for new results
        main.titlesArray = [];
        // display information for each tv show returned in the search
        show.forEach(function(element) {
          main.titlesArray.push(element.data);
        });
      });
      // if neither radio button is clicked
    } else {
      alert('Please select format');
    }
  };
}
