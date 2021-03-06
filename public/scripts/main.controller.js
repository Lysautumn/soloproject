angular.module('streamApp').controller('MainController', MainController);

// function for MainController
function MainController(streamapi, FavService, $http, $location) {
  var main = this;
  main.FavService = FavService;
  // establish arrays for search results
  main.titlesArray = [];
  main.netflixArray = [];
  main.streamArray = [];
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
          results.netflixResults.title = results.netflixResults.show_title;
          main.netflixArray.push(results.netflixResults);
        }
      });
      // if neither radio button is clicked
    } else {
      alert('Please select format');
    }
  };
  // function to clear list
  main.clearList = function() {
    main.titlesArray = [];
    main.netflixArray = [];
    main.streamArray = [];
    main.search = null;
    main.movie = false;
    main.tv = false;
  };
  // function to save title to DB
  main.save = function(index, array) {
    if(array === 'titlesArray') {
      main.title = main.titlesArray[index].title;
      main.poster = main.titlesArray[index].poster;
      console.log(main.titlesArray[index].title);
      console.log(main.titlesArray[index].poster);
    }
    if(array === 'netflixArray') {
      main.title = main.netflixArray[index].title;
      main.poster = main.netflixArray[index].poster;
      console.log(main.netflixArray[index].title);
      console.log(main.netflixArray[index].poster);
    }
    $http.post('/save', {
      user_id: main.id,
      title: main.title,
      image: main.poster
    }).then(function() {
      $location.path('/landing');
      alert('Title saved');
    }, function(error) {
      console.log('Error saving to DB', error);
    });
  };
  main.displayTitles = function() {
    $http.get('/save', {
    }).then(function(response) {
      main.FavService.favorites = response.data;
      $location.path('/list');
    }, function(error) {
      console.log('Error getting from DB', error);
    });
  };
}
