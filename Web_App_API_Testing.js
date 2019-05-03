var data = require("./Web_App/controllers/data.js");

data.findNameMatch("PRE-K CENTER @ 32-52 37TH STREET - QUEENS",function (object) {
	//console.log(object.name);//printed in data.js
	console.log(object.borough);
	console.log(object.description);
});