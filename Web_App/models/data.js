var fs = require("fs");
var express = require('express');
var router = express.Router();


//library to write text to a CSV
var GoogleSpreadsheet = require('google-spreadsheet');
//starts Google spreadsheet class
var creds = require('./../../client_secret.json');
//accesses client_secret.json file
var doc = new GoogleSpreadsheet('1nWx5MSPoFFttu9KqVhL0naXFff7KVD5BTjWzfQmjJvc');
//instantiates from spreadsheet class

//exports.findNameMatch("P.S./I.S. 338 - BROOKLYN");

exports.findNameMatchProject = function (nameSearch,callback) {
  console.log("NAME"+nameSearch);
  doc.useServiceAccountAuth(creds, function (err) {
    doc.getRows(3/*sheet of the spreadsheet*/, function (err, rows) {
      var output  = [];
      for (var i = 0; i < rows.length; i ++) {
        if (rows[i].name==nameSearch.trim()) {
          console.log(rows[i].name);
          output.push(rows[i]);
        }
      }
      console.log(output);
      callback(output);
    });
  });
}

exports.findNameMatchAttendance = function (nameSearch,callback) {
  console.log("NAME"+nameSearch);
  doc.useServiceAccountAuth(creds, function (err) {
    doc.getRows(4/*sheet of the spreadsheet*/, function (err, rows) {
      var output  = [];
      for (var i = 0; i < rows.length; i ++) {
        if (rows[i].name==nameSearch.trim()) {
          console.log(rows[i].name);
          output.push(rows[i]);
        }
      }
      console.log(output);
      callback(output);
    });
  });
}

exports.listSchools = function (callback) {
  doc.useServiceAccountAuth(creds, function (err) {
    doc.getRows(3/*sheet of the spreadsheet*/, function (err, rows) {
      var output = [];
      for (var i = 0; i < rows.length; i ++) {
          output.push(rows[i]);
      }
      console.log(output);
      callback(output);
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

exports.countBoroughMatches = function (borough,callback) {
  doc.useServiceAccountAuth(creds, function (err) {
    doc.getRows(3/*sheet of the spreadsheet*/, function (err, rows) {
      var count = 0;
      for (var i = 0; i < rows.length; i ++) {
        if (rows[i].borough==borough.trim()) {
          count ++;
        }
      }
      callback(count);
    });
  });
}

//module.exports = router;
