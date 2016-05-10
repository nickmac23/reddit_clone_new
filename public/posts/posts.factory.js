(function() {
  'use strict';

  angular.module('app')
  .factory('postsService', factory)

  function factory () {
    return {
      posts: [
        {
          title: 'This is reddit!',
          author: 'Leonidus',
          rating: 1000,
          date: 'june 23 1990',
          comments: ['0', '300!', 'oh shit!', 'this is reddit!']
        },
        {
          title: 'This is reddit!',
          author: 'Leonidus',
          rating: 1000,
          date: 'june 23 1990',
          comments: ['1', '300!', 'oh shit!', 'this is reddit!']
        },
        {
          title: 'This is reddit!',
          author: 'Leonidus',
          rating: 1000,
          date: 'june 23 1990',
          comments: ['2', '300!', 'oh shit!', 'this is reddit!']
        },
      ]
    }
  }
}());
