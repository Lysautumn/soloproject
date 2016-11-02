angular.module('streamApp').config(function($routeProvider, $locationProvider) {
  $routeProvider.when('/', {
    templateUrl: 'views/home.html'
  }).when('/register', {
    templateUrl: 'views/register.html'
  }).when('/landing', {
    templateUrl: 'views/landing.html'
  }).when('/alerts', {
    templateUrl: 'views/alerts.html'
  }).when('/list', {
    templateUrl: 'views/list.html'
  });
  $locationProvider.html5Mode(true);
});
