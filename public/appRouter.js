(function() {
  'use strict';
  var dependencies = [
    'ui.router',
    'ui.bootstrap'
  ];

  var firstCheck = true;

  angular.module('app', dependencies)
    .config(setupRoutes)
    .run(checkRoute)

  function checkRoute ($rootScope, $location) {
    $rootScope.$on( "$stateChangeStart", function(event, next, current) {
      // console.log($location);
      // console.log('here');
    })
  }
  setupRoutes.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider', '$httpProvider'];

  function setupRoutes($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider){
    // $locationProvider.html5Mode(true);
    $urlRouterProvider.otherwise("/");
    $stateProvider
      .state('home', {
        url: "/",
        template: "<posts></posts>"
      })
      .state('comments', {
        url: "/comments/:postId",
        template: "<comments></comments>",
      })
      .state('addpost', {
        url: "/addpost",
        template: "<add-post></add-post>",
        resolve:{
         simpleObj: function(authService){
            return authService.loggedin().then( function (data) {
              return data
            })
          }
        },
      })
      .state('userporfile', {
        url: "/userprofile",
        template: "<user-profile></user-profile>",
        resolve:{
         simpleObj: function(authService){
            return authService.loggedin().then( function (data) {
              return data
            })
          }
        },
      })
    $httpProvider.interceptors.push("AuthInterceptor");
  }

  angular.module('app')
  .service("AuthInterceptor", function($window, $location, $q, $rootScope){
    return {
      request: function(config){
        // prevent browser bar tampering for /api routes
        var token = $window.localStorage.getItem("token");
        if(token)
          config.headers.authorization =  token;
        return (config);
      },
      responseError: function(err){
        if (err.status === 403 && !firstCheck) {
          $rootScope.$emit('event')
        }
        firstCheck = false;
        // if you mess around with the token, log them out and destroy it
        if(err.status === 406){
          // $location.path("/logout");
          return err;
        }
        // if you try to access a user who is not yourself
        if(err.status === 401){
          $location.path('/users');
          return $q.reject(err);
        }
        return $q.reject(err);
      },
    };
  });
}());
