(function() {
  'use strict';

  angular.module('app')
  .directive('navBar', navBarDirective)

  function navBarDirective () {
    return {
      templateUrl:'/navBarr/navBar.dir.html',
      scope: {},
      controller: controller
    }

    function controller ($location, $rootScope, $state, $scope) {
      $scope.$state = $state;

    }
  }

}());
