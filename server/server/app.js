'use strict';

var http = require('http');
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');

var cors = require('cors');
var expressJwt = require('express-jwt');
var jwt = require('jsonwebtoken');



var app = express();

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

  var user = {
    username: req.body.username || 'bill',
    id: 1
  };

  var expires = {
    expiresInMinutes: 60
  };

  var token = jwt.sign(user, secret, expires);

  res.json({ token: token});
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
