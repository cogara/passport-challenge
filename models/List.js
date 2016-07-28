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

function addTable(userid, callback) {
  var id = '2';
  pool.connect(function(err, client, done){
    if(err) {
      console.log('Connection Error:', err);
      done();
      return callback(err);
    }
    client.query('CREATE TABLE "grocery_list_' + userid + '" ("id" serial, "item" varchar(20) NOT NULL, "qty" varchar(5) NOT NULL, PRIMARY KEY ("id"))', function(err, result){
      if(err) {
        console.log('Create table error', err);
        return callback(err);
      }
      console.log(result);
      done();
      return callback(null, result);
    });
  });
};

function getTable(userid, callback) {
  pool.connect(function(err, client, done){
    if(err) {
      console.log('Connection Error:', err);
      return callback(err);
    }
    client.query('SELECT * FROM grocery_list_' + userid, function(err, result){
      if(err) {
        console.log('Create table error', err);
        return callback(err);
      }
      // console.log(result.rows);
      done();
      return callback(null, result.rows);
    });
  });
}

function addToTable(userid, item, qty, callback) {
  console.log('params: ', userid, item, qty);
  if(item.length < 1 || qty.length < 1) {
    return callback(null, 'empty');
  }
  pool.connect(function(err, client, done){
    if(err) {
      console.log('Connection Error:', err);
      done();
      return callback(err);
    }
    client.query('INSERT INTO grocery_list_' + userid + ' (item, qty) VALUES ($1, $2)', [item, qty] , function(err, result){
      if(err) {
        console.log('Insert error', err);
        done();
        return callback(err);
      }
      console.log(result);
      done();
      return callback(null, result);
    });
  });
}

module.exports = {
  addTable: addTable,
  getTable: getTable,
  addToTable: addToTable
}
