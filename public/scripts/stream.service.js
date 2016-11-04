angular.module('streamApp').service('streamapi', StreamApiService);

// sets up http function and API variable
function StreamApiService($http) {
  var main = this;
  var API = 'http://api-public.guidebox.com/v1.43/US/rKAoemYxIt34rNVqrDbjRLqJIM59Z8Md';
  var netflixAPI = 'http://netflixroulette.net/api/api.php?title='
  // function for searching movies
  this.findMovie = function(movie) {
    var searchQuery = tripleEncode(movie);
    var netflixQuery = encodeQuery(movie);
    var moviePromises = [];
    // API request for movie ids from Guidebox
    return $http.get(API + '/search/movie/title/' + searchQuery + '/fuzzy').then(function(response) {
      for(var i = 0; i < response.data.results.length; i++) {
        var movieId = response.data.results[i].id;
        // API request for each movie's information
        var movieReq = $http.get(API + '/movie/' + movieId);
        console.log(movieReq);
        moviePromises.push(movieReq);
      }
      console.log(netflixQuery);
      return $http.get(netflixAPI + netflixQuery).then(function(response) {
        for(var i = 0; i < response.data.length; i++) {
          moviePromises.push(response);
        }
      });
      return Promise.all(moviePromises);
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
        var showReq = $http.get(API + '/show/' + showId);
        // API request for TV show streaming info
        var showStream = $http.get(API + '/show/' + showId + '/available_content');
        console.log(showStream);
        showPromises.push(showReq, showStream);
        return Promise.all(showPromises);
      }
      return Promise.all(showPromises);
    });

    var netflixPromise = $http.get(netflixAPI + netflixQuery).then(function(response) {
      var moviePromises = [];
      for(var i = 0; i < response.data.length; i++) {
        moviePromises.push(response);
      }
      return Promise.all(moviePromises);
    });


    return Promise.all([guideboxPromise, netflixPromise]).then(function(guideboxResults, netflixResults){
      return guideboxResults.concat(netflixResults);
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
