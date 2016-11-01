angular.module('streamApp').service('streamapi', StreamApiService);

// sets up http function and API variable
function StreamApiService($http) {
  var API = 'http://api-public.guidebox.com/v1.43/US/rKAoemYxIt34rNVqrDbjRLqJIM59Z8Md';
  var search = $('#search');
  var searchQuery = tripleEncode(search);
  // function for searching movies
  this.findMovie = function() {
    console.log('Inside findMovie');
    return $http.get(API + '/search/movie/title/' + searchQuery + '/fuzzy');
  };
  // function for searching shows
  this.findShow = function() {
    console.log('Inside findShow');
    return $http.get(API + '/search/title/' + searchQuery + '/fuzzy');
  };
}
function tripleEncode(string) {
  encodeURI(encodeURI(encodeURI(string)));
}
