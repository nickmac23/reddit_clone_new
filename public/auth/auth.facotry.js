(function() {
  'use strict';

  angular.module('app')
  .factory('authService', factory)

  factory.$inject =['$http'];

  function factory ($http) {
    return {
      login: login,
      signup: signup,
    }

    function login (userData) {
      return $http.post('http://localhost:3000/auth/login', userData)
      .then( function (responce) {
        console.log('returned login');
      })
    }
    function signup (userData) {
      return $http.post('http://localhost:3000/auth/signup', userData)
      .then( function (responce) {
        console.log('returned signup');
      })
    }
  }
}());
