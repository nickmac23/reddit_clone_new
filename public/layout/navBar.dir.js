(function() {
  'use strict';

  angular.module('app')
  .directive('navBar', navBarDirective)

  function navBarDirective () {
    console.log('sup');
    return {
      templateUrl:'/layout/navBar.dir.html',
    }
  }

}());
