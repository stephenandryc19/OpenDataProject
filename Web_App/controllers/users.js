var express = require('express');
var router = express.Router();

var Users = require('../models/Users');
var Data = require('../models/data');

router.get('/user/new',function(request, response){
  console.log('Request- /new user');
  response.status(200);
  response.setHeader('Content-Type', 'text/html')
  response.render('user_details');
});

router.post('/user', function(request,response){
console.log("Post- user");
var data=Users.allUsers(function(rows){
    for(var i=0; i<rows.length;i++){
      if(request.body.email==rows[i]["email"]){
        console.log("email found"+request.body.email);
        if(request.body.key==rows[i]["key"]){
          var user_data={};
          user_data.email=rows[i].email;
          response.status(200);
          response.setHeader('Content-Type', 'text/html')
          response.render('search',{user:user_data});
          break;
        }
        else{
          response.status(200);
          response.setHeader('Content-Type', 'text/html')
          response.render('error');
          break;
        }//anyway to get it to display your name instead of log in but
      }
    }
  });
});

router.get('/results/:id', function(request, response){
  console.log('Request- results');
  console.log("SCHOOL"+request.query.school);
  var user=Users.getUser(request.params.id, function(user){
  Data.findNameMatch(request.query.school,function (result) {
    response.status(200);
    response.setHeader('Content-Type', 'text/html');
    response.render('results',{result:result,user:user});
  });
});
});

router.put('/save/:id', function(request, response){
  console.log('Request- results');
  console.log("ID"+request.params.id);
  var user=Users.getUser(request.params.id);
  var allUsers= exports.allUsers(function(rows){
  for(var i=0; i<rows.length; i++){
    if(rows[i].email==user.email){
        rows[i].search_history=rows[i].search_history+request.query.school;
    }
    if(!rows[i].freq){
                          rows[i].freq = 0;
                        }
                        rows[i].freq = JSON.parse(rows[i].freq)+1;
                        rows[i].save();
            }
});
    response.status(200);
    response.setHeader('Content-Type', 'text/html');
    response.render('index');
});

module.exports = router;
