
var express = require('express');
var router = express.Router();

var Users = require('../models/Users');

router.get('/searchset1', function(request,response){//Attendence set
console.log("get- Attendance Data");
if()
response.status(200);
response.setHeader('Content-Type', 'text/html')
response.render('results');
});

router.get('/searchset2', function(request,response){//Projects set
console.log("get- Projects data");
response.status(200);
response.setHeader('Content-Type', 'text/html')
response.render('results');
});

module.exports = router;
