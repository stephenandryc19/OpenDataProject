var GoogleSpreadsheet = require('google-spreadsheet');

var creds = require('./../../client_secret.json');


var doc = new GoogleSpreadsheet('1nWx5MSPoFFttu9KqVhL0naXFff7KVD5BTjWzfQmjJvc');




exports.allUsers= function(callback){//parameter of function is a function
 doc.useServiceAccountAuth(creds, function (err) {
  //Get all of the rows from the spreadsheet.
   doc.getRows(5, function (err, rows) {
     console.log(rows[0]);
     callback(rows);
   });
 });
}

exports.getUser = function(user_id, callback) {
  console.log("user requested Users.getUser: "+user_id+getTime());
  var user = createBlankUser();
  var all_users = exports.allUsers(function(rows){
    for(var i=0; i<rows.length; i++){
      if(rows[i].email.trim()==user_id){
        user={
          email:rows[i].email.trim,
          key:rows[i].key.trim

        }
          console.log("right user");
      }
      else{
        console.log("user_id issues");
      }
    }
    console.log("Callback-"+user.name);
    callback(user);
  });
}
function createBlankUser(){
  var user={
      email:"",
      key:"",

    };
    return user;
  }
