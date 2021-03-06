angular.module('streamApp').service('streamapi', StreamApiService);

// sets up http function and API variables
function StreamApiService($http, $q) {
  var main = this;
  main.allResults = [];
  var API = '//api-public.guidebox.com/v1.43/US/rKAoemYxIt34rNVqrDbjRLqJIM59Z8Md';
  var netflixAPI = '//netflixroulette.net/api/api.php?title=';
  // function for searching movies
  this.findMovie = function(movie) {
    var searchQuery = tripleEncode(movie);
    var netflixQuery = encodeQuery(movie);
    var moviePromises = [];
    // API request for movie ids from Guidebox
    // .then will allow us to reformat the response before it get passed to the next thing waiting for it
    var guideboxPromise = $http.get(API + '/search/movie/title/' + searchQuery + '/fuzzy').then(function(response) {
      for(var i = 0; i < response.data.results.length; i++) {
        var movieId = response.data.results[i].id;
        // API request for each movie's information
        // .then will allow us to reformat the response before it get passed to the next thing waiting for it
        var movieReq = $http.get(API + '/movie/' + movieId).then(function(response) {
          return response.data;
        });
        // push information into moviePromises to deal with later
        moviePromises.push(movieReq);
      }
      return $q.all(moviePromises);
    });
    // push netflix information into netflixPromise
    var netflixPromise = $http.get(netflixAPI + netflixQuery).then(function(response) {
      return response.data;
      // what to do if there are no matching results from Netflix
    }).catch(function(err) {
      console.log('Error querying Netflix Roulette', err);
      return $q.resolve(null);
    });
    // handling promises
    return $q.all([guideboxPromise, netflixPromise]).then(function(results) {
      var guideboxResults = results[0];
      var netflixResults = results[1];

      main.allResults = {
        guideboxResults: guideboxResults,
        netflixResults: netflixResults
      };
      return main.allResults;
    });
  };
  // function for searching shows
  this.findShow = function(show) {
    var searchQuery = tripleEncode(show);
    var netflixQuery = encodeQuery(show);
    var showPromises = [];
    // API request for TV show ids from Guidebox
    var guideboxPromise = $http.get(API + '/search/title/' + searchQuery + '/fuzzy').then(function(response) {
      for(var i = 0; i < response.data.results.length; i++) {
        var showId = response.data.results[i].id;
        // API request for TV show info
        // .then will allow us to reformat the response before it get passed to the next thing waiting for it
        var showReq = $http.get(API + '/show/' + showId).then(function(response) {
          return response.data;
        });
        // API request for TV show streaming info
        // .then will allow us to reformat the response before it get passed to the next thing waiting for it
        var showStream = $http.get(API + '/show/' + showId + '/available_content').then(function(response) {
          return response.data;
        });
        // keep track of a list of promises to wait for
        // each element in the list is a promise waiting for show info and stream info
        showPromises.push($q.all([showReq,showStream]));
      }
      // return a promise that waits for everything from guidebox to finish
      return $q.all(showPromises);
    });
    var netflixPromise = $http.get(netflixAPI + netflixQuery).then(function(response) {
      return response.data;
    }).catch(function(err) {
      // if there are any errors in the netflix api, just resolve with null instead
      console.log('Error querying Netflix Roulette', err);
      return $q.resolve(null);
    });

    // finally, wait for both guidebox and netflix requests to finish and format the responses
    return $q.all([guideboxPromise, netflixPromise]).then(function(results) {
      var guideboxResults = results[0];
      var netflixResults = results[1];

      main.allResults = {
        guideboxResults: [],
        netflixResults: netflixResults
      };

      for (var i = 0; i < guideboxResults.length; i++) {
        var showInfo = guideboxResults[i][0];
        var streamInfo = guideboxResults[i][1];

        main.allResults.guideboxResults.push({showInfo, streamInfo});
      }
      return main.allResults;
    });
  };
}
// function to encode search query per Netflix Roulette API
var encodeQuery = function(string) {
  return encodeURI(string);
};
// function to triple encode search query per Guidebox rules
var tripleEncode = function(string) {
  return encodeURI(encodeURI(encodeURI(string)));
};
