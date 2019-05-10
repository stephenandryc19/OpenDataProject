var GoogleSpreadsheet = require('google-spreadsheet');

var creds = require('./../../client_secret.json');


var doc = new GoogleSpreadsheet('1nWx5MSPoFFttu9KqVhL0naXFff7KVD5BTjWzfQmjJvc');


exports.createUser = function(user_email, callback){
  console.log("Users.createUser"+user_email);
  var user= createBlankUser();

  var allUsers= exports.allUsers(function(rows){
    var userExist=false;
    console.log("running check");
    for(var i=0; i<rows.length; i++){
      console.log("checking row"+i);
      if(rows[i].email.trim()==user_email){
        userExist=true;
        console.log("not a new user");
     } else {
       console.log("is a new user");
     }
   }//loop for prior user with same user_email

   if(userExist==false){
     var user_key=createKey();
     user={
       email:user_email,
       key:user_key,
       history:""
     }
     console.log("userKey:"+user_key);
     doc.useServiceAccountAuth(creds,function(err){
       doc.addRow(5,user, function(err) {
         if(err) {
           console.log(err);
         }
       });
     });
     console.log("user created:"+user.email);
     callback(user);
   }

  else if(userExist==true){
      user=exports.getUser(user_email,function(user){
        console.log("EMAIL"+user.email)
          console.log("KEY"+user.key);
        callback(user);
      });
    }







    //working

  });
}
        //fill




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
  console.log("CHECKING ALL USERS")
 doc.useServiceAccountAuth(creds, function (err) {
  //Get all of the rows from the spreadsheet.
   doc.getRows(5, function (err, rows) {
     console.log("FIRST ROW"+rows[0].email);
     callback(rows);
   });
 });
}

exports.getUser = function(user_id, callback) {
  var user = createBlankUser();
  var all_users = exports.allUsers(function(rows){
    for(var i=0; i<rows.length; i++){
      if(rows[i].email.trim()==user_id){
        console.log("HISTORY"+rows[i].history);
        user={
          email:rows[i].email.trim(),
          key:rows[i].key.trim(),
          history:rows[i].history.trim()

        }
          console.log("right user");
      }
      else{
        console.log("user_id issues");
      }
    }
    console.log("Callback-"+user.email);
    callback(user);
  });
}


function createBlankUser(){
  var user={
      email:"",
      key:"",
      history:""

    }
    return user;
  }
