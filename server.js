//module requires
var express = require('express');
var bodyParser = require('body-parser');
var passport = require('passport');
var session = require('express-session');
var mongoose = require('mongoose');
var path = require('path');
var LocalStrategy = require('passport-local').Strategy;
var User = require('./models/user.js');
//req routes
var index = require('./routes/index.js');
var login = require('./routes/login.js');
var register = require('./routes/register.js');
var checkAuth = require('./routes/checkAuth.js');

//server app
var app = express();

//mongoDB setup
var mongoURI = 'mongodb://localhost:27017/prime_example_passport';
var MongoDB = mongoose.connect(mongoURI).connection;

MongoDB.on('error', function(err){
  console.log('mongodb connection error', err);
});

MongoDB.once('open', function(){
  console.log('connection to MongoDB open');
});

//static, config files
app.use(express.static('/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(session({
  secret: 'secret',
  key: 'user',
  resave: true,
  saveUninitialized: false,
  cookie: {maxAge: 30 * 60 * 1000, secure: false}
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use('local', new LocalStrategy({
  passReqToCallback: true,
  usernameField: 'username'
  },
  function(request, username, password, done){
    User.findOne({username: username}, function(err, user){
      if(err) {
        throw err;
      };
      if(!user){
        return done(null, false, {message: 'Incorrect username and password'})
      };

      //test a matching password
      user.comparePassword(password, function(err, isMatch){
        if(err) {
          throw err;
        };

        if(isMatch) {
          return done(null, user);
        } else {
          done(null, false, {message: 'Incorrect username and password'});
        }
      });
    });
  })
);

passport.serializeUser(function(user, done) {
  done(null, user.id);
})

passport.deserializeUser(function(id, done){
  User.findById(id, function(err, user){
    if(err){
      return done(err);
    }
    done(null, user);
  });
});


app.use('/', index);
app.use('/login', login);
app.use('/register', register);
app.use('/*', checkAuth);
app.get('/content', function(request, response) {
  if(request.user.admin) {
    response.sendFile(path.join(__dirname, 'restricted', 'supersecret.html'));
  } else {
    response.sendFile(path.join(__dirname, 'restricted', 'content.html'));
  }
});
app.get('/logout', function(request, response) {
  request.logout();
  response.redirect('/');
})



//server start
var server = app.listen(3000, function() {
  var port = server.address().port;
  console.log('Listening on port', port);
})
