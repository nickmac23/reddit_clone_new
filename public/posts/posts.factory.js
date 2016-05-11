(function() {
  'use strict';

  factory.$inject =['$http'];

  angular.module('app')
  .factory('postsService', factory)

  function factory ($http) {
    var posts = []
    return {
      list: listPosts,
    }

    function listPosts () {
      return $http.get('http://localhost:3000/api/')
      .then( function (responce) {
        posts = responce.data;
        return posts
      })
    }
  }
}());
