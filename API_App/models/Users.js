var GoogleSpreadsheet = require('google-spreadsheet');

var creds = require('./client_secret.json');


var doc = new GoogleSpreadsheet('1D4cOG9jV0L0UiuK4TEYpHTGgb_tizTMk4O3Hl4VlEq4');


exports.createUser = function(user_email){
  console.log("Users.createUser"+user_email);
  var user_key=createKey();
  var user={
    email:user_email,
    key:user_key
  };
  doc.addRow(1,user, function(err) {
    if(err) {
      console.log(err);
    }

  });
  return user;
  //fill
}

function createKey(){
  var keyString;
  var numString;
  for(var i=0; i<7; i++){
    var num=Math.floor(Math.random() * 33) + 93;
    if(i%2==0){
        numString=String.fromCharCode(num);
        keyString=keyString+num;
    }
    else(){
      numString=num.toString();
      keyString+=numString;
    }
  return(keyString);
}
