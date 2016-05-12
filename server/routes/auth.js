var express = require('express');
var router = express.Router();
var knex = require('../db/knex.js')
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');


function token (id) {
  console.log('tk');
  var secret = 'nicknasty'
  var token = jwt.sign({id: id}, secret)
  return token
}
/* GET home page. */
router.post('/login', function(req, res, next) {
  knex('authors').where({name: req.body.name}).first()
  .then(function (author) {
    if (!author) {
      res.json('invalid username')
    } else {
      bcrypt.compare(req.body.password, author.password, function(err, correct) {
          if (correct) {
          //   try {
          //     var decoded = jwt.verify(token, secret);
          //     console.log('first', decoded);
          //   } catch(err) {
          //     console.log('second', decoded)
          //   }
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
  bcrypt.genSalt(10, function(err, salt) {
      bcrypt.hash(req.body.password, salt, function(err, hash) {
        knex('authors').insert({
                              name: req.body.name,
                              password: hash,
                              })
                        .returning('*')
        .then( function (author) {
            console.log(author);
          var tk = token (author[0].author_id)
          res.json({token: tk, user: author})
        })
      });
  });
})

module.exports = router;
