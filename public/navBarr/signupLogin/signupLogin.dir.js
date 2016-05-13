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

    function controller ($scope, authService, $uibModal, $rootScope) {
      var sl = this;
      sl.logout = logout;
      sl.modal = modal;
      $rootScope.$on('event', function () {
        sl.modal()
      })

      $scope.$watch(function(){
          return authService.getUser();
        },
        function (newUser) {
          sl.user = newUser;
        }, true);

      function modal () {
        $uibModal.open({
          templateUrl: 'myModalContent.html',
          size: 'lg',
          controller: function ($scope, $uibModalInstance, authService) {
            $scope.modal = {};

            $scope.modal.signup = function () {
              authService.signup($scope.sng)
              .then( function(responce) {
                if (responce.status === 406) {
                  $scope.modal.msgS = responce.data
                } if (responce.status === 200) {
                  $uibModalInstance.close();
                } else {
                  console.log(responce);
                }
              })
            };
            $scope.modal.login = function () {
              authService.login($scope.lgn)
              .then( function(responce) {
                if (responce.status === 406) {
                  $scope.modal.msgL = responce.data
                }
                if (responce.status === 200) {
                  $uibModalInstance.close();
                } else {
                  console.log(responce.data);
                }
              })
            };

            $scope.cancel = function () {
              $uibModalInstance.dismiss('cancel');
            };
        }
      })
    }

      function logout () {
        authService.logOut()
      }

    }
  }
}());
