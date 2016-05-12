var express = require('express');
var router = express.Router();
var knex = require('../db/knex.js')
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
var secret = 'nicknasty'


function token (id) {
  var token = jwt.sign({id: id}, secret)
  return token
}

function checkAuthor (name) {
  return knex('authors').where({name: name}).first()
    .then(function (author) {
      return author
    })
}

router.post('/login', function(req, res, next) {
  checkAuthor(req.body.name).then(function (author) {
    if (!author) {
      res.json('invalid username')
    } else {
      bcrypt.compare(req.body.password, author.password, function(err, correct) {
          if (correct) {

            var tk = token(author.author_id)
            res.json({token: tk, user: author})
          } else {
            res.json('bad password no token!')
          }
      });
    }
  })
})


router.post('/signup', function(req, res, next) {
  checkAuthor (req.body.name).then(function (author) {
    if (author) {
      res.json('username allready exsits!')
    } else {
      bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(req.body.password, salt, function(err, hash) {
          knex('authors').insert({
            name: req.body.name,
            password: hash,
          })
          .returning('*')
          .then( function (author) {
            var tk = token (author[0].author_id)
            res.json({token: tk, user: author})
          })
        });
      });
    }
  })
})

module.exports = router;
