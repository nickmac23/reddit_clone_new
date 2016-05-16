(function() {
  'use strict';

  factory.$inject =['$http'];

  angular.module('app')
  .factory('postsService', factory)

  function factory ($http) {
    var posts = []
    var urlApi =  'https://icantbelieveitsnotreddit.herokuapp.com/api'
    return {
      postAll: postAll,
      list: listPosts,
      add: addPost,
      comment: addComment,
      vote: vote,
      del: del,
    }


    function postAll (route, data) {
      return $http.post( urlApi + route, data).then(
        function (responce) {
          return responce
        }
      )
    }

    function listPosts () {
      return $http.get(urlApi + '/')
      .then( function (responce) {
        posts = responce.data;
        return posts
      })
    }

    function addPost (postData) {
      return postAll('/post', postData).then( function (responce){
        posts.push(responce.data)
        return posts
      })
    }

    function addComment (commentData) {
      return $http.post( urlApi + '/comment', commentData)
      .then( function (responce) {
        var data = responce.data[0];
        for (var i = 0; i < posts.length; i++) {
          if (posts[i].post_id == data.post_fk) {
            // data = {comment: data.comment}
            posts[i].comments.push(data)
          }
        }
        return posts;
      })
    }

    function vote (data) {
      return $http.post( urlApi + '/vote', data)
      .then( function (responce) {
        var data = responce.data[0];
        for (var i = 0; i < posts.length; i++) {
          if (posts[i].post_id == data.post_id) {
            posts[i].rating = data.rating;
          }
        }
        return posts
      })
    }
    function del (id) {
      return $http.delete( urlApi + '/posts/' + id)
      .then( function (resoponce) {
        var data = resoponce.data[0]
        if (resoponce.status === 200) {
          for (var i = 0; i < posts.length; i++) {
            if (posts[i].post_id == data.post_id) {
              posts.splice(i, 1);
              return posts
            }
          }
        }
      })
    }
  }
}());
