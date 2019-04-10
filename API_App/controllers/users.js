
var express = require('express');
var router = express.Router();

var Users = require('../models/Users');



router.get('/login',function(request, response){
  console.log('Request- /login');
  response.status(200);
  response.setHeader('Content-Type', 'text/html')
  response.render('user_details');
});

router.get('/logout',function(request, response){
  console.log('Request- /logout');
  response.status(200);
  response.setHeader('Content-Type', 'text/html')
  response.render('index');
});

router.post('/results', function(request,response){
console.log("Post- user w/API Key");
Users.createUser(request.body.email);
response.status(200);
response.setHeader('Content-Type', 'text/html')
response.render('results');
});

module.exports = router;
