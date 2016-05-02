var http = require('http');
var express = require('express');
var mongoose = require('mongoose');

var server = express();

var User;

var db = mongoose.connection;
db.on('error', console.error);
db.once('open', function() {
  var UserSchema = mongoose.Schema({
    _id: Number,
    name: String,
    surname: String
  });

  User = mongoose.model('users', UserSchema);

  User.find( function (err, users) {
    if (err) return console.error(err);
    console.log(users);
  });
});

mongoose.connect('mongodb://localhost/QDB');


server.set('port', process.env.PORT || 3005);
 
server.get('/', function (req, res) {
  res.send('<html><body><h1>Cocco Bello</h1></body></html>');
});

http.createServer(server).listen(server.get('port'), function(){
  console.log('Express server listening on port ' + server.get('port'));
});

console.log('Server running on port 3005.');


server.get('/users', function (req, res, next) {
  User.find({name: 'Giacomo'},function (err, docs) {
    if (err) return next(err);
    res.json(docs);
  });
});