var express = require('express');
var router = express.Router();
var knex = require('../db/knex.js')

/* GET home page. */
router.get('/', function(req, res, next) {
  knex('authors')
  .leftOuterJoin('posts', 'posts.author_fk', 'authors.author_id')
  // .leftOuterJoin('comments', 'comments.author_fk', 'authors.author_id')
  .then( function (authors) {
    console.log(authors);
    res.json(authors)
  })
});

module.exports = router;
