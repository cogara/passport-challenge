var router = require('express').Router();

router.use('/', function(request, response, next) {
  if(!request.isAuthenticated()) {
    response.send('GET OUT OF HERE!!! YOU DON\'T BELONG! <br /><a href="/login">login</a>');
    // response.redirect('/');
  }
  else {
    // console.log('Request from:', request.user.username, ', ID:', request.user._id, 'at', new Date());
    next();
  }
});

module.exports = router;
