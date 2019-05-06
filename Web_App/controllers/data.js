var fs = require("fs");
//library to write text to a CSV
var GoogleSpreadsheet = require('google-spreadsheet');
//starts Google spreadsheet class
var creds = require('./../../client_secret.json');
//accesses client_secret.json file
var doc = new GoogleSpreadsheet('1nWx5MSPoFFttu9KqVhL0naXFff7KVD5BTjWzfQmjJvc');
//instantiates from spreadsheet class

//exports.findNameMatch("P.S./I.S. 338 - BROOKLYN");

exports.findNameMatch = function (name,callback) {
  doc.useServiceAccountAuth(creds, function (err) {
    doc.getRows(3/*sheet of the spreadsheet*/, function (err, rows) {
      for (var i = 0; i < rows.length; i ++) {
        if (rows[i].name==name.trim()) {
          console.log(rows[i].name);
          callback(rows[i]);
        }
      }
    });
  });
}

exports.listSchools = function (callback) {
  doc.useServiceAccountAuth(creds, function (err) {
    doc.getRows(3/*sheet of the spreadsheet*/, function (err, rows) {
      for (var i = 0; i < rows.length; i ++) {
          callback(rows[i]);
      }
    });
  });
}

exports.findBoroughMatch = function (borough,callback) {
  doc.useServiceAccountAuth(creds, function (err) {
    doc.getRows(3/*sheet of the spreadsheet*/, function (err, rows) {
      for (var i = 0; i < rows.length; i ++) {
        if (rows[i].borough==borough.trim()) {
          console.log(rows[i].name+" "+rows[i].borough);
          callback(rows[i]);
        }
      }
    });
  });
}

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
