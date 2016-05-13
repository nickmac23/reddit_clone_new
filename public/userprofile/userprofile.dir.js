(function() {
  'use strict';

  angular.module('app')
  .directive('userProfile', directive)

  function directive () {
    return {
      templateUrl: '/userprofile/userprofile.dir.html',
      controller: controller,
      controllerAs: 'up',
    }

    function controller (postsService, $scope, authService) {
      var up= this;
      up.del = del;
      activate ()

      $scope.$watch(function(){
          return authService.getUser();
        },
        function (newUser) {
          up.user = newUser;
        }, true);


      function activate () {
        postsService.list().then( function (responce) {
          up.posts = []
          up.total = 0;
          for (var i = 0; i < responce.length; i++) {
            if (up.user.author_id === responce[i].author_id) {
              up.total += +responce[i].rating
              up.posts.push(responce[i])
            }
          }
        })
      }

      function del (id) {
        postsService.del(id).then(function (responce) {
          up.posts = [];
          for (var i = 0; i < responce.length; i++) {
            if (up.user.author_id === responce[i].author_id) {
              up.total += +responce[i].rating
              up.posts.push(responce[i])
            }
          }
        })
      }
    }
  }
}());
