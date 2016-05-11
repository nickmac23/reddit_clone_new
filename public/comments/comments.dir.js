(function() {
  'use strict';

  angular.module('app')
  .directive('comments', directive)

  function directive () {
    return {
      templateUrl: '/comments/comments.dir.html',
      scope: {},
      controller: controller,
      controllerAs: 'vm',
    }
  }

  function controller ($scope, $stateParams, postsService) {
    var vm = this;
    $scope.vm.comment = false;
    activate();

    function activate () {
      postsService.list().then( function (responce) {
        for (var i = 0; i < responce.length; i++) {
          if (responce[i].post_id == $stateParams.postId) {
            vm.post = responce[i];
            return
          }
        }

      })
    }
  }
}());
