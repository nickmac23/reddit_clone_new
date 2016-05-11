(function() {
  'use strict';

  factory.$inject =['$http'];

  angular.module('app')
  .factory('postsService', factory)

  function factory ($http) {
    var posts = []
    return {
      list: listPosts,
      add: addPost,
    }

    function listPosts () {
      return $http.get('http://localhost:3000/api/')
      .then( function (responce) {
        posts = responce.data;
        return posts
      })
    }

    function addPost (postData) {
      return $http.post('http://localhost:3000/api/post')
      .then( function (responce) {
        posts.push(responce.data)
        return posts
      })
    }
  }
}());
