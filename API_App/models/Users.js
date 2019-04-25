var GoogleSpreadsheet = require('google-spreadsheet');

var creds = require('./../../client_secret.json');


var doc = new GoogleSpreadsheet('1nWx5MSPoFFttu9KqVhL0naXFff7KVD5BTjWzfQmjJvc');


exports.createUser = function(user_email){
  console.log("Users.createUser"+user_email);
  var user=createBlankUser();
  var allUsers= exports.allUsers(function(rows){
    var newUser=false;
    for(var i=0; i<rows.length; i++){
      if(rows[i].email.trim()==user_email){
        newUser=true;
       user={
         email:user_email,
         key:rows[i].key.trim()
       }
         console.log("userKey:"+user_key);
     }
      else{
        var user_key=createKey();
        user={
          email:user_email,
          key:user_key
        }
        console.log("userKey:"+user_key);
        doc.useServiceAccountAuth(creds,function(err){
        doc.addRow(5,user, function(err) {
          if(err) {
            console.log(err);
          }
        });
      });
    }
      console.log("user created:"+user.email);

  }
        //fill

    });
      return user;
  }


function createKey(){
  console.log("create Key");
  var keyString="";
  var numString="";
  for(var i=0; i<7; i++){
    console.log("keys progress:"+keyString);
    var num=Math.floor(Math.random() * 33) + 93;
    console.log("num"+num);
    if(i%2==0){
        numString=String.fromCharCode(num);
        console.log("numString"+numString);
        keyString=keyString+numString;
    }
    else{
      numString=num.toString();
      keyString+=numString;
    }
  }
    console.log("keys:"+keyString);
  return(keyString);

}

exports.allUsers= function(callback){//parameter of function is a function
  console.log("WHAT IS THIS")
 doc.useServiceAccountAuth(creds, function (err) {
  //Get all of the rows from the spreadsheet.
   doc.getRows(5, function (err, rows) {
     console.log("STUFF"+rows[0].email);
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

    }
    return user;
  }
