(function() {
  'use strict';

    angular.module('app')
    .directive('sideBar', directive)

    function directive () {
      return {
        templateUrl: '/sideBarr/sideBar.dir.html'
      }
    }
}());
