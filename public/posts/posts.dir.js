(function() {
  'use strict';

  angular.module('app')
  .directive('posts', directive)

  function directive () {
    return {
      templateUrl: '/posts/posts.dir.html',
    }
  }
}());
