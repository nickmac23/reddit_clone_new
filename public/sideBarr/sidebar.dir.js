(function() {
  'use strict';

    angular.module('app')
    .directive('sideBar', directive)

    function directive () {
      return {
        templateUrl: '/sideBarr/sideBar.dir.html',
        controller: controller,
        controllerAs: 'sb',
      }

      function controller ($scope, $http, authService) {
        var sb = this;
        sb.login = login;


        function login () {
          authService.login($scope.lgn)
        }
      }
    }
}());
