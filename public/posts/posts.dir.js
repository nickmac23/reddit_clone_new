(function() {
  'use strict';

  angular.module('app')
  .directive('posts', directive)

  function directive () {
    return {
      templateUrl: '/posts/posts.dir.html',
      controller: controller,
      controllerAs: 'vm',
    }

    function controller (postsService, $rootScope) {
      var vm = this;
      vm.vote = vote;
      activate ()

      function activate () {
        postsService.list().then( function (responce) {
          vm.posts = responce;
        })
      }

      function vote (num, post_id) {
        postsService.vote({num: num, post_id: post_id })
      }
    }
  }
}());
