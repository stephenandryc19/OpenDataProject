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

router.get('/results/project/:id', function(request, response){
  console.log('Request- results');
  console.log("SCHOOL"+request.query.school);
  var searchName=request.query.school;
  var user=Users.getUser(request.params.id, function(user){
  Data.findNameMatchProject(request.query.school,function (result) {
    response.status(200);
    response.setHeader('Content-Type', 'text/html');
    response.render('results',{result:result,user:user,search:searchName});
  });
});
});
router.get('/results/attendance/:id', function(request, response){
  console.log('Request- results');
  console.log("SCHOOL"+request.query.school);
  var searchName=request.query.school;
  var user=Users.getUser(request.params.id, function(user){
  Data.findNameMatchAttendance(request.query.school,function (result) {
    response.status(200);
    response.setHeader('Content-Type', 'text/html');
    response.render('results',{result:result,user:user,search:searchName});
  });
});
});

router.put('/save/:id/:search', function(request, response){
  console.log('Request- results');
  console.log("ID"+request.params.id);
  console.log("SCHOOL"+request.params.search);
  var allUsers= Users.allUsers(function(rows){
  for(var i=0; i<rows.length; i++){
    if(rows[i].email==request.params.id){
        rows[i].history+=","+request.params.search;
    }
    if(!rows[i].freq){
                          rows[i].freq = 0;
                        }
                        rows[i].freq = JSON.parse(rows[i].freq)+1;
                        rows[i].save();
            }
});
var user=Users.getUser(request.params.id, function(user){
    response.status(200);
    response.setHeader('Content-Type', 'text/html');
    response.render('user_details',{user:user});
  });
});

module.exports = router;
