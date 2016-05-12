var express = require('express');
var router = express.Router();
var knex = require('../db/knex.js')
var postarray = []

/* GET home page. */
router.post('/login', function(req, res, next) {
  res.json({test: req.body})
})

router.post('/signup', function(req, res, next) {
  res.json({test: req.body})
})

module.exports = router;
