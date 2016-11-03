angular.module('streamApp').config(function($routeProvider, $locationProvider) {
  $routeProvider.when('/', {
    templateUrl: 'views/home.html',
    contoller: 'MainController as main'
  }).when('/registeruser', {
    templateUrl: 'views/reg.html'
  }).when('/landing', {
    templateUrl: 'views/landing.html',
    controller: 'MainController as main'
  }).when('/alerts', {
    templateUrl: 'views/alerts.html'
  }).when('/list', {
    templateUrl: 'views/list.html'
  });
  $locationProvider.html5Mode(true);
});
