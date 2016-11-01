angular.module('streamApp').service('streamapi', StreamApiService);

// sets up http function and API variable
function StreamApiService($http) {
  var main = this;
  var API = 'http://api-public.guidebox.com/v1.43/US/rKAoemYxIt34rNVqrDbjRLqJIM59Z8Md';
  // function for searching movies
  this.findMovie = function(movie) {
    console.log('Inside findMovie');
    console.log('Searching for: ', movie);
    var searchQuery = tripleEncode(movie);
    console.log('searchQuery:', searchQuery);
    $http.get(API + '/search/movie/title/' + searchQuery + '/fuzzy').then(function(response) {
      var movieId = response.results.id;
      return movieId;
      console.log('movieId:', movieId);
      var movieReq = $http.get(API + '/movie/' + movieId);
      console.log('movieReq:', movieReq);
    });
  };
  // function for searching shows
  this.findShow = function(show) {
    console.log('Inside findShow');
    console.log('Searching for: ', show);
    var searchQuery = tripleEncode(show);
    console.log('searchQuery:', searchQuery);
    var showId = $http.get(API + '/search/title/' + searchQuery + '/fuzzy');
    console.log('showId:', showId);
    var showReq = $http.get(API + '/show/' + showId);
    console.log('showReq:', showReq);
  };
}
var tripleEncode = function(string) {
  return encodeURI(encodeURI(encodeURI(string)));
};
