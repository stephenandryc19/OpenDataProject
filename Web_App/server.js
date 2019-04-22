app.get('/', function(request, response){
  console.log('Request- default route');
  response.status(200);
  response.setHeader('Content-Type', 'text/html')
  response.render('index');
});


app.get('/login', function(request, response){
  console.log('Request- login');

  var data=Users.allUsers(function(rows){
    for(var i=0; i<rows.length;i++){
      if(request.query.email==rows[i]["email"]){
        if(request.query.key==rows[i]["key"]){
          var user_data={};
          user_data.email=rows[i].email;
          response.status(200);
          response.setHeader('Content-Type', 'text/html')
          response.render('game', {user:user_data});
          break;
        }
      }
        else{
          response.status(200);
          response.setHeader('Content-Type', 'text/html')
          response.render('error');
          break;
        }
      }
    }
  });
});
/*

app.get('/logout', function(request, response){
  console.log('Request- logout');
  response.status(200);
  response.setHeader('Content-Type', 'text/html')
  response.render('index');
});

app.get('/settings', function(request, response){
  console.log('Request- settings');
  response.status(200);
  response.setHeader('Content-Type', 'text/html')
  response.render('settings');
});

*/
