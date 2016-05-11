(function() {
  'use strict';

  angular.module('app')
  .directive('addComment', directive)

  function directive () {
    return {
      templateUrl: '/comments/addComment/addComment.dir.html',
      controller: controller,
      controllerAs: 'cm',
      scope: {
        show: '='
      }
    }

    function controller ($scope) {
      var cm = this;

      cm.addComment = addComment

      function addComment () {
        console.log($scope.frm);
      }
    }
  }
}());
