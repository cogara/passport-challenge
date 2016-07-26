var router = require('express').Router();
var path = require('path');
var passport = require('passport');
var Users = require('../models/user.js');


router.get('/', function(request, response) {
  response.sendFile(path.join(__dirname, '..', 'public', 'views', 'register.html'));
})

router.post('/', function(request, response, next) {
  Users.create(request.body, function(err, post) {
    if(err) {
      if (err.errors.password) {
        var errorMsg = err.errors.password.message.split('`');
      }
      if(err.errors.username){
        var errorMsg = err.errors.username.message.split('`');
      }
      response.send('registration failed <a href="/register">Return to registration</a><br /><br />' + errorMsg[1] + ' is required');
      // console.log(err.errors.password.message);
      // next(err)
    } else {
      //we registered user, but they have not logged in yet
      //redirect to login page
      response.redirect('/login');
    }
  });
});

module.exports = router;
