'use strict';

var http = require('http');
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');

var cors = require('cors');
//Express middleware
var expressJwt = require('express-jwt');
//decyrpt and encyrpyt
var jwt = require('jsonwebtoken');



var app = express();
//should put this in a .env
var secret = 'this is my secret';
var config = {
 secret: secret
};

app.use(cors());
app.use('/api', expressJwt(config));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, '../www')));

app.post('/auth', function(req, res){
  //to see how the post request is working right:
  // console.log(req.body);

//normally you would hash the password and check the users name

if(req.body.username === 'hello'){
  var user = {
    username: req.body.username || 'bill',
    id: 1
  };

  var expires = {
    expiresInMinutes: 60
  };
//generate token
  var token = jwt.sign(user, secret, expires);
//send as json
  res.json({ token: token});
} else {
  //if the user is not hello, send error
  res.status(401).send('Credentials are bad!');
}

});

app.get('/api/resource', function(req, res){
  console.log(req.user);
  res.json({
    hello: 'world'
  });
});

var server = http.createServer(app);

server.listen(3000);
server.on('listening', function() {
  console.log('listening on 3000');
});
