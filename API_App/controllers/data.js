
var express = require('express');
var router = express.Router();

var Users = require('../models/Users');

router.post('/results', function(request,response){
console.log("Post- results");
response.status(200);
response.setHeader('Content-Type', 'text/html')
response.render('results');
});

module.exports = router;
