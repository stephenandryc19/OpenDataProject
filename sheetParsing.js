var GoogleSpreadsheet = require('google-spreadsheet');
//starts Google spreadsheet class
var creds = require('./client_secret.json');
//accesses client_secret.json file
var doc = new GoogleSpreadsheet('1nWx5MSPoFFttu9KqVhL0naXFff7KVD5BTjWzfQmjJvc');
//instantiates from spreadsheet class
doc.useServiceAccountAuth(creds, function (err) {
  doc.getRows(3/*sheet of the spreadsheet*/, function (err, rows) {
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
  		row.push(string);
  		//row parsing completed
  		/*
  		doc.addRow(3,row, function(err) {//objectify row as argument
			if(err) {
				console.log(err);//fix errors
			}
		});
		*/
	    //console.log(rows[i].text);//actual text of the row
		//console.log(row);//parsed row array
	}
	//runs through each row of the column
  });
});