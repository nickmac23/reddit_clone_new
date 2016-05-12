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

    function controller ($scope, postsService, $stateParams) {
      var cm = this;

      cm.addComment = addComment

      function addComment () {
        $scope.frm.post_fk = $stateParams.postId
        postsService.comment($scope.frm).then( function (data) {
          $scope.frm = {};
          $scope.show=!$scope.show;
        })
      }
    }
  }
}());
