
var express = require('express');
var router = express.Router();

var Users = require('../models/Users');



router.get('/user/new',function(request, response){
  console.log('Request- /new user');
  //Users.createUser(request.body.email);
  response.status(200);
  response.setHeader('Content-Type', 'text/html')
  response.render('user_details');
});

router.post('/results', function(request,response){
console.log("Post- user w/API Key");
//Users.crea(request.body.name,request.body.password);
response.status(200);
response.setHeader('Content-Type', 'text/html')
response.render('results');
});

module.exports = router;
