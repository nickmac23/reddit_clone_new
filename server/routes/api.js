var express = require('express');
var router = express.Router();
var knex = require('../db/knex.js')
var jwt = require('jsonwebtoken');
var secret = 'nicknasty';
var token;
var id;
var name;
var postarray = []

function checkToken (req,res,next){
  try {
    var decoded = jwt.verify(req.headers.authorization, secret);
      id = decoded.id
      name = decoded.name
      next();
    }
   catch(err) {
    res.status(403).send("invalid token");
  }
}

router.get('/', function(req, res, next) {
  postarray = [];
  knex('authors')
  .leftOuterJoin('posts', 'posts.author_fk', 'authors.author_id')
  .then( function (posts) {
    for (var i = 0; i < posts.length; i++) {
      if (!(posts[i].title == null)) {
        postarray.push(posts[i])
      }
    }
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
router.delete('/posts/:id', function(req, res, next) {
  knex('posts').where('post_id', req.params.id).del()
  .returning('*')
  .then( function (data) {
    res.json(data)
  })
})

router.post('/post', checkToken, function(req, res, next) {
  req.body.author_fk = id
  knex('posts').insert(req.body).then(function (responce) {
    res.json(responce);
  })
})

router.post('/comment',checkToken, function(req, res, next) {
  req.body.author_fk = id;
  knex('comments').insert(req.body)
  .returning('*')
  .then(function (responce) {
    responce[0].name = name
    res.json(responce);
  })
})
router.post('/vote',checkToken, function(req, res, next) {
  return knex('posts').where({post_id: req.body.post_id})
  .increment('rating', req.body.num)
  .returning('*')
  .then(function(responce){
    res.json(responce)
  })
})


module.exports = router;
