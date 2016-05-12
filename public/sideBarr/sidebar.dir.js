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
        sb.user = null;
        activate ();

        $scope.$watch(function(){
            return authService.getUser();
          },
          function (newUser) {
            sb.user = newUser;
          }, true);

        function activate () {
          authService.loggedin().then( function(data) {
            sb.user = data
          })
        }


        function login () {
          authService.login($scope.lgn).then(function (responce) {
            $scope.lgn = {}
            sb.user = responce;
          })
        }
      }
    }
}());
