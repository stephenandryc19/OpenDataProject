var express = require('express');
var fs = require('fs');
var favicon = require('serve-favicon');
//this file should just be index, rules, stats, about, logout
var app = express();
var methodOverride = require('method-override');
var dataFile = require("./models/data.js");

app.use(methodOverride('_method'));
app.use(express.static('public'));
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
//a//pp.use(favicon(__dirname + '/public/images/logo.png'));
app.use(express.json());
app.use(express.urlencoded());

app.use(require('./controllers/users'));

var Users = require(__dirname + '/models/Users');
var Data = require(__dirname + '/models/data');
var port = process.env.PORT || 3000;
app.listen(port);


app.get('/', function(request, response){
  console.log('Request- default route');
  dataFile.listSchools(function (list){
    response.status(200);
    response.setHeader('Content-Type', 'text/html')
    response.render('index',{data:list});
  });
});

app.get('/login', function(request, response){
  console.log('Request- login');
  response.status(200);
  response.setHeader('Content-Type', 'text/html');
  response.render('user_details');
});









app.get('/logout', function(request, response){
  console.log('Request- logout');
  response.status(200);
  response.setHeader('Content-Type', 'text/html')
  response.render('index');
});
