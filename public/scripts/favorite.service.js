angular.module('streamApp').service('FavService', FavService);

function FavService() {
  var main = this;
  main.favorites = [];
}
