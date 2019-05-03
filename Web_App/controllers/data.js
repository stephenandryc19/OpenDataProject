
var express = require('express');
var router = express.Router();

var Users = require('../models/Users');






/*
router.get('/searchset2', function(request, response){
  console.log('Request- search set 2');
  response.status(200);
  response.setHeader('Content-Type', 'text/html')
  response.render('index');
});

router.post('/savedata', function(request,response){
console.log("Post- save data");
response.status(200);
response.setHeader('Content-Type', 'text/html')
response.render('settings');
});


router.delete('/mydata/:id', function(request, response){
  console.log('Request- search set 2');
  response.status(200);
  response.setHeader('Content-Type', 'text/html')
  response.render('settings');
});


*/

module.exports = router;
