var router = require('express').Router();
var path = require('path');
var passport = require('passport');

router.get('/', function(request, response) {
  if(!request.isAuthenticated()) {
    response.sendFile(path.join(__dirname, '..', 'public', 'views', 'login.html'));
  } else {
    response.redirect('/content');
  }
})

router.get('/fail', function(request, response) {
  response.sendFile(path.join(__dirname, '..', 'public', 'views', 'failure.html'));
})

router.post('/',
 passport.authenticate('local', {
  successRedirect: '/content',
  failureRedirect: '/login/fail'
  })
);

module.exports = router;
