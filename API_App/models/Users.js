var GoogleSpreadsheet = require('google-spreadsheet');

var creds = require('./../../client_secret.json');


var doc = new GoogleSpreadsheet('1nWx5MSPoFFttu9KqVhL0naXFff7KVD5BTjWzfQmjJvc');


exports.createUser = function(user_email){
  console.log("Users.createUser"+user_email);
  var user_key=createKey();

  var user={
    email:user_email,
    key:user_key
  };
  doc.useServiceAccountAuth(creds,function(err){
  doc.addRow(5,user, function(err) {
    if(err) {
      console.log(err);
    }
  });
});
  console.log("user created:"+user.email);
  return user;
  //fill
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
