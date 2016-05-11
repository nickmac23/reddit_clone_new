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
      comment: addComment,
    }

    function listPosts () {
      return $http.get('http://localhost:3000/api/')
      .then( function (responce) {
        posts = responce.data;
        return posts
      })
    }

    function addPost (postData) {
      return $http.post('http://localhost:3000/api/post', postData)
      .then( function (responce) {
        posts.push(responce.data)
        return posts
      })
    }

    function addComment (commentData) {
      return $http.post('http://localhost:3000/api/comment', commentData)
      .then( function (responce) {
        var data = responce.config.data
        for (var i = 0; i < posts.length; i++) {
          if (posts[i].post_id == data.post_fk) {
            data = {name: 'Cooper', comment: data.comment, date: 'just now'}
            posts[i].comments.push(data)
          }
        }
        return posts;
      })
    }
  }
}());
