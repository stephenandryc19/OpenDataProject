var express = require('express');
var fs = require('fs');
var favicon = require('serve-favicon');
//this file should just be index, rules, stats, about, logout
var app = express();
var methodOverride = require('method-override');

app.use(methodOverride('_method'));
app.use(express.static('public'));
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
//a//pp.use(favicon(__dirname + '/public/images/logo.png'));
app.use(express.json());
app.use(express.urlencoded());

app.use(require('./controllers/users'));
app.use(require('./controllers/data'));

var Users = require(__dirname +'/models/Users');
var port = process.env.PORT || 3000;
app.listen(port);


app.get('/', function(request, response){
  console.log('Request- default route');
  response.status(200);
  response.setHeader('Content-Type', 'text/html')
  response.render('index');
});

app.get('/login', function(request, response){
  console.log('Request- login');

/*  var data=Users.allUsers(function(rows){
    var new_user=true;
    for(var i=0; i<rows.length;i++){
      if(request.query.player_name==rows[i]["name"]){
        new_user=false;
        if(request.query.password==rows[i]["password"]){
          var user_data={};
          user_data.name=rows[i].name;
          response.status(200);
          response.setHeader('Content-Type', 'text/html')
          response.render('game', {user:user_data});
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
    if(new_user){
      var user=Users.createUser("new","user");
      console.log(user);
      response.status(200);
      response.setHeader('Content-Type', 'text/html');
      response.render('user_details',{user:user});
    }
  });*/
});

app.get('/logout', function(request, response){
  console.log('Request- logout');
  response.status(200);
  response.setHeader('Content-Type', 'text/html')
  response.render('index');
});
