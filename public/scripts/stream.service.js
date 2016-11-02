angular.module('streamApp').service('streamapi', StreamApiService);

// sets up http function and API variable
function StreamApiService($http) {
  var main = this;
  var API = 'http://api-public.guidebox.com/v1.43/US/rKAoemYxIt34rNVqrDbjRLqJIM59Z8Md';
  // function for searching movies
  this.findMovie = function(movie) {
    var searchQuery = tripleEncode(movie);
    var moviePromises = [];
    $http.get(API + '/search/movie/title/' + searchQuery + '/fuzzy').then(function(response) {
      for(var i = 0; i < response.data.results.length; i++) {
        var movieId = response.data.results[i].id;
        var movieReq = $http.get(API + '/movie/' + movieId);
        console.log('movieReq:', movieReq);
        moviePromises.push(movieReq);
      }
      return Promise.all(moviePromises);
    });
  };
  // function for searching shows
  this.findShow = function(show) {
    var searchQuery = tripleEncode(show);
    var showPromises = [];
    $http.get(API + '/search/title/' + searchQuery + '/fuzzy').then(function(response) {
      for(var i = 0; i < response.data.results.length; i++) {
        var showId = response.data.results[i].id;
        var showReq = $http.get(API + '/show/' + showId);
        console.log('showReq:', showReq);
        showPromises.push(showReq);
      }
      return Promise.all(showPromises);
    });
  };
}
// function to triple encode search query per Guidebox rules
var tripleEncode = function(string) {
  return encodeURI(encodeURI(encodeURI(string)));
};
