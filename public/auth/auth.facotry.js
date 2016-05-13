

(function() {
  'use strict';

  angular.module('app')
  .factory('authService', factory)

  factory.$inject =['$http'];

  function factory ($http) {
    var user = false;
    return {
      loggedin: loggedin,
      login: login,
      signup: signup,
      getUser: getUser,
      logOut: logOut,
    }
    function getUser () {
      return user
    }
    function loggedin () {
      return $http.post('http://localhost:3000/auth/loggedin')
      .then( function (responce) {
        if (responce.data) {
          user = responce.data;
          return user
        }
      })
    }


    function login (userData) {
      console.log('authout', userData);
      return $http.post('http://localhost:3000/auth/login', userData)
      .then( function (responce) {
        console.log('authIn', responce);
        if (responce.data.token) {
          localStorage.setItem('token', responce.data.token);
          user = {name: responce.data.user.name, id: responce.data.user.author_id}
        }
        return user
      })
    }
    function signup (userData) {
      return $http.post('http://localhost:3000/auth/signup', userData)
      .then( function (responce) {
        if (responce.data.token) {
          localStorage.setItem('token', responce.data.token);
          user = {name: responce.data.author, id: responce.data.author_id}

        }
        return user
      })
    }
    function logOut () {
      user = false;
      localStorage.clear();
    }
  }
}());
