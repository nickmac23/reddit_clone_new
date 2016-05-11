var express = require('express');
var router = express.Router();
var knex = require('../db/knex.js')

/* GET home page. */
router.get('/', function(req, res, next) {
  knex('authors')
  .innerJoin('posts', 'posts.author_fk', 'authors.id')
  .innerJoin('comments', 'comments.author_fk', 'authors.id')
  .then( function (authors) {
    res.json(authors)
  })
});

module.exports = router;
