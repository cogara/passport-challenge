var router = require('express').Router();
var path = require('path');
var passport = require('passport');
var User = require('../models/user.js');


router.get('/', function(request, response) {
  response.sendFile(path.join(__dirname, '..', 'public', 'views', 'register.html'));
})

router.post('/', function(request, response, next){
  console.log(request.body);
  var username = request.body.username;
  var password = request.body.password;
  User.create(username, password, function(err, user) {
    if(err) {
      console.log('Server Create Error', err);
      // if (err.errors.password) {
      //   var errorMsg = err.errors.password.message.split('`');
      // }
      // if(err.errors.username){
      //   var errorMsg = err.errors.username.message.split('`');
      // }
      // console.log(errorMsg);
      response.sendStatus(500);
    }
    console.log('User Created:', user);
    response.redirect('/login');
  });

});

module.exports = router;
