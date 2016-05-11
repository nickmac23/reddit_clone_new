var express = require('express');
var router = express.Router();
var knex = require('../db/knex.js')
var postarray = []

/* GET home page. */
router.get('/', function(req, res, next) {
  knex('authors')
  .leftOuterJoin('posts', 'posts.author_fk', 'authors.author_id')
  .then( function (posts) {
    postarray = posts
    return postarray
  }).then( function (postarray){
    knex('authors')
    .innerJoin('comments', 'comments.author_fk', 'authors.author_id')
    .then( function (comments) {
      for (var i = 0; i < postarray.length; i++) {
        postarray[i].comments = [];
        for (var j = 0; j < comments.length; j++) {
          if (postarray[i].post_id === comments[j].post_fk) {
            postarray[i].comments.push({
                                        comment: comments[j].comment,
                                        date:    comments[j].date,
                                        name: comments[j].name,
                                        author_id: comments[j].author_id
                                      })
          }
        }
      }
      res.json(postarray)
    })
  })
});

router.post('/post', function(req, res, next) {
  knex('posts').insert(req.body).then(function (responce) {
    res.json(responce);
  })
})
router.post('/comment', function(req, res, next) {
  knex('comments').insert(req.body).then(function (responce) {
    res.json(responce.config);
  })
})

module.exports = router;
