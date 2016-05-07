// set up ======================================================================
var express = require('express');
var app = express(); 						// create our app w/ express
var mongoose = require('mongoose'); 				// mongoose for mongodb
var port = process.env.PORT || 8080; 				// set the port
var database = require('./config/database'); 			// load the database config
var morgan = require('morgan');

// configuration ===============================================================
mongoose.connect(database.localUrl); 	// Connect to local MongoDB instance.
app.use('/Quizzipedia',express.static(__dirname + '/public'));  // statics resources for all /Quizzipedia path

app.use(morgan('dev')); // log every request to the console

// routes ======================================================================
require('./app/routes.js')(app);  // RESTful requests

app.route('/').get(function (req, res) {
  res.redirect('/Quizzipedia/signup'); // load the single view file (angular will handle the page changes on the front-end)
});

app.route('/Quizzipedia').get(function (req, res) {
  res.redirect('/Quizzipedia/signup'); // load the single view file (angular will handle the page changes on the front-end)
});

app.route('/Quizzipedia/users').get(function (req, res) {
  res.sendFile(__dirname + '/public/view/users.html'); // load the single view file (angular will handle the page changes on the front-end)
});

app.route('/Quizzipedia/signup').get(function (req, res) {
  res.sendFile(__dirname + '/public/view/signup.html'); // load the single view file (angular will handle the page changes on the front-end)
});

app.listen(port);
