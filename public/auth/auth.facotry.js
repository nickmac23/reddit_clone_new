

(function() {
  'use strict';

  angular.module('app')
  .factory('authService', factory)

  factory.$inject =['$http'];

  function factory ($http) {
    var user = false;
    var url = 'https://icantbelieveitsnotreddit.herokuapp.com/auth/'
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
      return $http.post(url + 'loggedin')
      .then( function (responce) {
        if (responce.data) {
          user = responce.data;
          return user
        }
      })
    }


    function login (userData) {
      return $http.post(url + 'login', userData)
      .then( function (responce) {
        if (responce.status === 406 ) {
          return responce
        }
        if (responce.data.token) {
          localStorage.setItem('token', responce.data.token);
          user = {name: responce.data.user.name, id: responce.data.user.author_id, status: 200}
        }
        return user
      })
    }
    function signup (userData) {
      return $http.post(url + 'signup', userData)
      .then( function (responce) {
        if (responce.status === 406 ) {
          return responce
        }
        if (responce.data.token) {
          localStorage.setItem('token', responce.data.token);
          user = {name: responce.data.author, id: responce.data.author_id, status: 200}

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
