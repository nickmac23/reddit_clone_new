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
          $scope.sb.msgl = false;
          authService.login($scope.sbFrm).then(function (responce) {
            if (responce.status === 406) {
              $scope.sb.msgL = responce.data
            }
            if (responce.status === 200) {
              $scope.sbFrm = {}
              sb.user = responce; 
            } else {
              console.log(responce.data);
            }
          })
        }
      }
    }
}());
