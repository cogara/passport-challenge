var pg = require('pg');
var bcrypt = require('bcrypt');
var SALT_WORK_FACTOR = 10;

var config = {
  database: 'passportchallenge',
  port: 5432,
  max: 10,
  idleTimeoutMillis: 30000
}

var pool = new pg.Pool(config);

function findByUsername(username, callback) {
  pool.connect(function(err, client, done){
    if(err) {
      console.log('Connection Error:', err);
      done();
      return callback(err);
    }
    client.query('SELECT * FROM users WHERE username=$1', [username], function(err, result){
      if(err) {
        console.log('Query Error', err);
        done();
        return callback(err);
      }
      // console.log(result.rows);
      done();
      return callback(null, result.rows[0])
    });
  });
}

function findById(id, callback) {
  pool.connect(function(err, client, done){
    if(err) {
      console.log('Connection Error:', err);
      done();
      return callback(err);
    }
    client.query('SELECT * FROM users WHERE id=$1', [id], function(err, result){
      if(err) {
        console.log('Query Error', err);
        done();
        return callback(err);
      }
      // console.log(result.rows);
      done();
      return callback(null, result.rows[0])
    });
  });
}



function create(username, password, callback) {

  bcrypt.hash(password, SALT_WORK_FACTOR, function(err, hash) {
    if(err) {
      console.log('HASH Erro: ', err);
      return done(err);
    }



    pool.connect(function(err, client, done) {
      if(err) {
        console.log('Connection Error', err);
        done();
        return callback(err);
      }
      // console.log('Username', username);
      // console.log('Password', password, hash);
      client.query('INSERT INTO users (username, password) ' +
                  'VALUES ($1, $2) RETURNING id, username',
                  [username, hash],
                  function(err, result) {
          if(err) {
            console.log('Create Error', err);
            done();
            return callback(err)
          }
          done();
          return callback(null, result.rows[0]);
      });
    });
  });
}

function comparePassword(username, candidatePassword, callback) {

  findByUsername(username, function(err, user) {
    if(err) {
      done();
      return callback(err)
    }
    bcrypt.compare(candidatePassword, user.password, function(err, isMatch) {
      if(err) {
        console.log(err);
        return callback(err);
      }
      // console.log(isMatch);
      // console.log('User in compare function', user);
      callback(null, isMatch, user);
    });
  });
}



module.exports = {
  findByUsername: findByUsername,
  create: create,
  findById: findById,
  comparePassword: comparePassword
}
