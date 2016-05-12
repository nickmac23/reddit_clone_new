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
      sl.logout = logout;

      $scope.$watch(function(){
          return authService.getUser();
        },
        function (newUser) {
          sl.user = newUser;
        }, true);

      function login () {
        authService.login($scope.lgn).then(function (responce) {
        })
      }
      function signup () {
        authService.signup($scope.sng)
        .then( function(responce) {
        })
      }
      function logout () {
        authService.logOut()
      }

    }
  }
}());
