/*
IMPORTANT INFORMATION ON HOW TO UPLOAD DATA

1) INSERT NEW DATA INTO PAGES 1 AND 2 OF GOOGLE SHEETS DOCUMENT
2) RUN THIS PROGRAM UNTIL COMPLETION
3) ON GOOGLE SHEETS INSERT THE CSV FILE
*/

var fs = require("fs");
//library to write text to a CSV
var GoogleSpreadsheet = require('google-spreadsheet');
//starts Google spreadsheet class
var creds = require('./client_secret.json');
//accesses client_secret.json file
var doc = new GoogleSpreadsheet('1nWx5MSPoFFttu9KqVhL0naXFff7KVD5BTjWzfQmjJvc');
//instantiates from spreadsheet class
doc.useServiceAccountAuth(creds, function (err) {
  var projectRows = [];
  var attendanceRows = [];
  doc.getRows(1/*sheet of the spreadsheet*/, function (err, rows) {
    for (var i = 0; i < rows.length; i ++) {
      //row parsing beginning
      var row = [];
      var quoting = false;
      var string = "";
      for (var j = 0; j < rows[i].text.length; j ++) {
        if (rows[i].text[j]=="\"") {
          quoting = !quoting;
        } else if ((!quoting)&&rows[i].text[j]==",") {
          row.push(string);
          string = "";
        } else {
          string = string + rows[i].text[j];
        }
      }
      if (row.length != 20) console.log(i+" parsed irregularly "+row.length);
      //console.log(string);
      //console.log(rows[i].text);//actual text of the row
      //console.log(row);//parsed row array
      else projectRows.push(row);
    }
    //runs through each row of the column
    var csvOutput1 = "name,borough,description\n";
    for (var j = 0; j < projectRows.length; j ++) {
      if (projectRows[j][0].length!=0||projectRows[j][10].length!=0||projectRows[j][3].length!=0) {
        csvOutput1 += projectRows[j][0]+",";
        csvOutput1 += projectRows[j][10]+",";
        csvOutput1 += projectRows[j][3]+"\n";
      }
    }
    fs.writeFileSync("projectData.csv",csvOutput1);
  });
  doc.getRows(2/*sheet of the spreadsheet*/, function (err, rows) {
    for (var i = 0; i < rows.length; i ++) {
      var parsedArray = [];
      //console.log("Row "+i);
      if (rows[i].column4.length!=0){
        //console.log("Content "+rows[i].column4);
        var rawArray = rows[i].column4.split(">");
        //console.log(rawArray);
        for (var j = 1; j < rawArray.length; j += 2) {
          parsedArray.push(rawArray[j].split("<")[0].trim());
        }
        //console.log(parsedArray);
        //[2] is percentage
        //[4] is name
        //[5] is borough
      }
      //console.log(parsedArray.length);
      if (parsedArray.length != 0) {
        if (parsedArray.length != 7) console.log(i+" parsed irregularly "+parsedArray.length);
        else {
          var elements = parsedArray[4].split(",");
          var replacement = "";
          for (var k = 0; k < elements.length; k ++) {
            //if (k == 1) console.log("Comma name: "+i);
            if (k > 0) replacement += "/";
            replacement += elements[k];
          }
          parsedArray[4]=replacement;
          attendanceRows.push(parsedArray);
        }
      }
    }
    //runs through each row of the column
    attendanceRows.pop();//removes aggregate percentage at end
    attendanceRows.shift();//removes header at front
    var csvOutput2 = "name,borough,attendancePercentage\n";
    for (var j = 0; j < attendanceRows.length; j ++) {
      if (attendanceRows[j][4].length!=0||attendanceRows[j][5].length!=0||attendanceRows[j][2].length!=0) {
        csvOutput2 += attendanceRows[j][4]+",";
        csvOutput2 += attendanceRows[j][5]+",";
        csvOutput2 += attendanceRows[j][2]+"\n";
      }
    }
    fs.writeFileSync("attendanceData.csv",csvOutput2);
  });
});
