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

    function controller (postsService) {
      var vm = this;
      activate ()

      function activate () {
        postsService.list().then( function (responce) {
          vm.posts = responce;
        })
      }
    }
  }
}());
