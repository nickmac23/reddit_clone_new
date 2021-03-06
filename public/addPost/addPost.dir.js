(function() {
  'use strict';

  angular.module('app')
  .directive('addPost', directive)

  function directive () {
    return {
      templateUrl: '/addPost/addPost.dir.html',
      scope: {},
      controller: controller,
      controllerAs: 'vm'
    }

    function controller (postsService, $scope, $state) {
      var vm = this;
      $scope.frm = {}
      vm.addPost = addPost

      function addPost () {
        postsService.add($scope.frm).then(function (data) {
          $scope.frm = {};
          $state.go('home')
        })
      }
    }
  }

}());
