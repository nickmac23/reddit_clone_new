var express = require('express');
var router = express.Router();
var knex = require('../db/knex.js')
var bcrypt = require('bcrypt');


/* GET home page. */
router.post('/login', function(req, res, next) {
  knex('authors').where({name: req.body.name}).first()
  .then(function (author) {
    bcrypt.compare(req.body.password, author.password, function(err, correct) {
        if (correct) {
          res.json('tocken!')
        } else {
          res.json('bad password no token!')
        }
    });
  })
})

router.post('/signup', function(req, res, next) {
  bcrypt.genSalt(10, function(err, salt) {
      bcrypt.hash(req.body.password, salt, function(err, hash) {
        knex('authors').insert({
                              name: req.body.name,
                              password: hash,
                              })
        .then( function (data) {
          res.json(data)
        })
      });
  });
})

module.exports = router;
