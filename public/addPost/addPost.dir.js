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

    function controller (postsService, $scope) {
      var vm = this;
      $scope.frm = {}
      $scope.frm.url = 'http://fillmurray.com/200/300';
      vm.addPost = addPost

      function addPost () {
        $scope.frm.name = 'Leonidus'
        postsService.add($scope.frm).then(function (data) {
          $scope.frm = {};
        })
      }
    }
  }

}());
