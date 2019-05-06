
var express = require('express');
var router = express.Router();

var Users = require('../models/Users');

router.get('/user/new',function(request, response){
  console.log('Request- /new user');
  response.status(200);
  response.setHeader('Content-Type', 'text/html')
  response.render('user_details');
});

router.post('/user', function(request,response){
console.log("Post- user");
var data=Users.allUsers(function(rows){
    var new_user=true;
    for(var i=0; i<rows.length;i++){
      if(request.query.email==rows[i]["email"]){
        new_user=false;
        if(request.query.key==rows[i]["key"]){
          var user_data={};
          user_data.email=rows[i].email;
          response.status(200);
          response.setHeader('Content-Type', 'text/html')
          response.render('index');
          break;
        }
        else{
          response.status(200);
          response.setHeader('Content-Type', 'text/html')
          response.render('error');
          break;
        }
      }
    }
    }
});

module.exports = router;
