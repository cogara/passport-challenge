var router = require('express').Router();
var path = require('path');
var passport = require('passport');
var Users = require('../models/user.js');


router.get('/', function(request, response) {
  response.sendFile(path.join(__dirname, '..', 'public', 'views', 'register.html'));
})

router.post('/', function(request, response, next) {
  console.log('Request body:', request.body);
  Users.create(request.body, function(err, post) {
    if(err) {
      next(err)
    } else {
      //we registered user, but they have not logged in yet
      //redirect to login page
      response.redirect('/login');
    }
  });
});

module.exports = router;
