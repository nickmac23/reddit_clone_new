var express = require('express');
var router = express.Router();
var knex = require('../db/knex.js')
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
var secret = 'nicknasty'
var user;


function token (id, name) {
  var token = jwt.sign({id: id, name: name}, secret)
  return token
}

function checkAuthor (data) {
  return knex('authors').where(data).first()
    .then(function (author) {
      return author
    })
}

function checkToken (req,res,next){
  try {
    var decoded = jwt.verify(req.headers.authorization, secret);
      user = decoded.id
      next()
    }
   catch(err) {
    res.status(403).send("invalid token");
  }
}

router.post('/loggedin', checkToken, function (req,res, next) {
  checkAuthor({author_id: user}).then( function (responce){
    res.json(responce)
  })
})

router.post('/login', function(req, res, next) {
  console.log(req.body);
  checkAuthor({name: req.body.name}).then(function (author) {
    if (!author) {
      res.json('invalid username')
    } else {
      bcrypt.compare(req.body.password, author.password, function(err, correct) {
          if (correct) {

            var tk = token(author.author_id, author.name)
            res.json({token: tk, user: author})
          } else {
            res.json('bad password no token!')
          }
      });
    }
  })
})


router.post('/signup', function(req, res, next) {
  checkAuthor ({name: req.body.name}).then(function (author) {
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
            var tk = token (author[0].author_id, author[0].name)
            res.json({token: tk, user: author})
          })
        });
      });
    }
  })
})

module.exports = router;
