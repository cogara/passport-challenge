var router = require('express').Router();
var path = require('path');
var passport = require('passport');

router.get('/', function(request, response) {
  if(!request.isAuthenticated()) {
    response.sendFile(path.join(__dirname, '..', 'public', 'views', 'index.html'));
  } else {
    response.redirect('/content');
  }
})

module.exports = router;
