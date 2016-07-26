var router = require('express').Router();

router.use('/', function(request, response, next) {
  if(!request.isAuthenticated()) {
    response.send('GET OUT OF HERE!!! YOU DON\'T BELONG! <br /><a href="/login">login</a>');
    // response.redirect('/');
  }
  else {
    console.log(request.user);
    next();
  }
});

module.exports = router;
