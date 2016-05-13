(function() {
  'use strict';


  angular.module('app')
  .directive('layOut', directive)

  function directive () {
    return {
      templateUrl: '/layout/layout.dir.html',
      scope: {},
      controller: controller,
      controllerAs: 'layOut',
    }

    function controller ($scope, $uibModal, $rootScope) {
      var layOut = this;
      // modal = {};
      layOut.hi = 'modal'
      layOut.hello = 'modalhello'
      layOut.openModal = openModal;
      $rootScope.$on('asdf', function ( _, data) {
        openModal();
      })

      function openModal () {
          $uibModal.open({
            templateUrl: 'myModalContent.html',
            size: 'lg',
            controller: function ($scope, $uibModalInstance, authService) {
              $scope.modal = {};
              $scope.modal.signup = function () {
                authService.signup($scope.sng)
                .then( function(responce) {
                  if (responce) {
                    $uibModalInstance.close();
                  } else {
                    console.log(responce);
                  }
                })
              };
              $scope.modal.login = function () {
                authService.login($scope.lgn)
                .then( function(responce) {
                  if (responce) {
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
    }
  }
}());
