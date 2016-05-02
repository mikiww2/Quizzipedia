var http = require('http');
var express = require('express');
var mongoose = require('mongoose');

//var server = express();

var db = mongoose.connection;
db.on('error', console.error);
db.once('open', function() {
  var UserSchema = mongoose.Schema({
    _id: Number,
    name: String,
    surname: String
  });

  var User = mongoose.model('users', UserSchema);

  var utente = new User({
    _id: 3,
    name: 'Michela',
    surname: 'De Bortoli'
  });

  utente.save( function (err, users) {
    if (err) return console.error(err);
    console.log(users);
  });

});

mongoose.connect('mongodb://localhost/QDB');