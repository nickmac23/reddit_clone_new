(function() {
  'use strict';

  angular.module('app')
  .directive('signupLogin', directive)

  function directive () {
    return {
      templateUrl: '/navBarr/signupLogin/signupLogin.dir.html',
      scope: {},
      controller: controller,
      controllerAs: 'sl',
    }

    function controller ($scope, authService) {
      var sl = this;
      sl.login = login;
      sl.signup = signup;

      function login () {
        authService.login($scope.lgn).then(function (responce) {
          console.log('here', responce);
        })
      }
      function signup () {
        authService.signup($scope.sng)
        .then( function(responce) {
          console.log( responce );

        })
      }

    }
  }
}());
