var express = require('express');
var router = express.Router();
var knex = require('../db/knex.js')

/* GET home page. */
router.get('/', function(req, res, next) {
  knex('posts')
  .innerJoin('authors', 'posts.author_fk', 'authors.id')
  .then( function (authors) {
    res.json(authors)
  })
});

module.exports = router;
