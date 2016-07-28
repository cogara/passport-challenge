var router = require('express').Router();
var List = require('../models/List.js');
var User = require('../models/user.js');

router.post('/', function(request, response) {
  console.log('add list');
  var id = request.user.id;
  List.addTable(id, function(err, result) {
    if(err) {
      console.log('Create Table Error', err);
    }
    console.log('Table Created!');
  })
})

router.get('/', function(request, response) {
  console.log('get list');
  var id = request.user.id;
  List.getTable(id, function(err, result) {
    if(err) {
      console.log('Get Table Error', err);
      response.sendStatus(500);
    }
    // console.log('Result', result);
    response.send(result);
  })
})

router.post('/add', function(request, response) {
  var id = request.user.id;
  var item = request.body.item;
  var qty = request.body.qty;
  List.addToTable(id, item, qty, function(err, result) {
    if(err) {
      console.log('Get Table Error', err);
      response.sendStatus(500);
    }
    console.log('Result', result);
    console.log('Insert Success!');
  })
})

module.exports = router;
