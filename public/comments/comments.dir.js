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
    vm.vote = vote;
    activate();

    function vote (num, post_id) {
      postsService.vote({num: num, post_id: post_id })
    }

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
