angular.module('streamApp').config(function($routeProvider, $locationProvider) {
  $routeProvider.when('/', {
    templateUrl: 'views/home.html'
  }).when('/registeruser', {
    templateUrl: 'views/reg.html'
  }).when('/landing', {
    templateUrl: 'views/landing.html'
  }).when('/alerts', {
    templateUrl: 'views/alerts.html'
  }).when('/list', {
    templateUrl: 'views/list.html'
  }).when('/loginuser', {
    templateUrl: 'views/li.html'
  });
  $locationProvider.html5Mode(true);
});
