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
        template: "<posts></posts>"
      })
      .state('comments', {
        url: "/comments/:commentId",
        template: "<comments></comments>"
      })
      .state('addpost', {
        url: "/addpost",
        template: "<add-post></add-post>"
      })
  }
}());
