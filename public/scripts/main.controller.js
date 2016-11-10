angular.module('streamApp').controller('MainController', MainController);

// function for MainController
function MainController(streamapi) {
  var main = this;
  // establish arrays for search results
  main.titlesArray = [];
  main.netflixArray = [];
  main.streamArray = [];
  console.log('MainController loaded');
  main.forSearch = function() {
    // if movie radio is clicked
    if(main.movie) {
      streamapi.findMovie(main.search).then(function(results) {
        // empty arrays for new results
        main.titlesArray = [];
        main.netflixArray = [];
        main.streamArray = [];
        // push movie information into arrays
        results.guideboxResults.forEach(function(element) {
          element.poster = element.poster_400x570;
          main.streamArray.push(element.purchase_web_sources);
          main.streamArray.push(element.subscription_web_sources);
          main.titlesArray.push(element);
        });
        if(results.netflixResults) {
          main.netflixArray.push(results.netflixResults);
        }
      });
      // if tv radio is clicked
    } else if(main.tv) {
      streamapi.findShow(main.search).then(function(results) {
        // empty arrays for new results
        main.titlesArray = [];
        main.netflixArray = [];
        main.streamArray = [];
        // push tv show information into arrays
        results.guideboxResults.forEach(function(element) {
          main.titlesArray.push(element.showInfo);
          main.streamArray.push(element.streamInfo.results.web.episodes);
        });
        if(results.netflixResults) {
          main.netflixArray.push(results.netflixResults);
        }
      });
      // if neither radio button is clicked
    } else {
      alert('Please select format');
    }
  };
  main.clearList = function() {
    main.titlesArray = [];
    main.netflixArray = [];
    main.streamArray = [];
    main.search = null;
    main.movie = false;
    main.tv = false;
  };
}
