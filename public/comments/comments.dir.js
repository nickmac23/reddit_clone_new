(function() {
  'use strict';

  angular.module('app')
  .directive('comments', directive)

  function directive () {
    return {
      scope: {},
      templateUrl: '/comments/comments.dir.html',
      controller: controller,
      controllerAs: 'vm',
    }
  }

  function controller ($scope, $stateParams, postsService) {
    console.log('here');
    var vm = this;
    activate();

    function activate () {
      vm.post = postsService.posts[$stateParams.commentId]
    }
  }
}());
