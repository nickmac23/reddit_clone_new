(function() {
  'use strict';
  var dependencies = [
    'ui.router',
  ];

  angular.module('app', dependencies)
    .config(setupRoutes);

  setupRoutes.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider'];

  function setupRoutes($stateProvider, $urlRouterProvider, $locationProvider){
    $locationProvider.html5Mode(true);
    $urlRouterProvider.otherwise("/");

    $stateProvider
      .state('home', {
        url: "/",
        template: "<app>Dog</app>"
      })
      // .state('login', {
      //   url: "/login",
      //   templateUrl: "./test.html"
      // })
  }
}());
