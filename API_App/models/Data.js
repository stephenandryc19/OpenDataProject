var GoogleSpreadsheet = require('google-spreadsheet');

var creds = require('./../../client_secret.json');


var doc = new GoogleSpreadsheet('1nWx5MSPoFFttu9KqVhL0naXFff7KVD5BTjWzfQmjJvc');



exports.allProjectData= function(callback){//parameter of function is a function
 doc.useServiceAccountAuth(creds, function (err) {
  //Get all of the rows from the spreadsheet.
   doc.getRows(3, function (err, rows) {
     callback(rows);
   });
 });
}
exports.allAttendenceData= function(callback){//parameter of function is a function
 doc.useServiceAccountAuth(creds, function (err) {
  //Get all of the rows from the spreadsheet.
   doc.getRows(4, function (err, rows) {
     callback(rows);
   });
 });
}
