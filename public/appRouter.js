(function() {
  'use strict';
  var dependencies = [
    'ui.router',
    'ui.bootstrap'
  ];

  angular.module('app', dependencies)
    .config(setupRoutes);

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
              console.log(data);
              return data
            })
          }
         },
      })
    $httpProvider.interceptors.push("AuthInterceptor");
  }

  angular.module('app')
  .service("AuthInterceptor", function($window, $location, $q){
    return {
      request: function(config){
        // prevent browser bar tampering for /api routes
        var token = $window.localStorage.getItem("token");
        if(token)
          config.headers.authorization =  token;
        return (config);
      },
      responseError: function(err){
        console.log(err.data);
        // if you mess around with the token, log them out and destroy it
        if(err.data === "invalid token" || err.data === "invalid signature" || err.data === "jwt malformed"){
          // $location.path("/logout");
          console.log(err.data);
          return $q.reject(err);
        }
        // if you try to access a user who is not yourself
        if(err.status === 401){
          $location.path('/users');
          return $q.reject(err);
        }
        return $q.reject(err);
      }
    };
  });
}());
