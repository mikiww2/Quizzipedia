// set up ======================================================================
var express = require('express');
var app = express(); 						// create our app w/ express
var mongoose = require('mongoose'); 				// mongoose for mongodb
var port = process.env.PORT || 8080; 				// set the port
var database = require('./config/database'); 			// load the database config
var cookieParser = require('cookie-parser');
var session = require('express-session');
var b_parser = require('body-parser');
var morgan = require('morgan');

// configuration ===============================================================
mongoose.connect(database.localUrl); 	// Connect to local MongoDB instance.
app.use('/Quizzipedia',express.static(__dirname));  // statics resources for all /Quizzipedia path

app.use(morgan('dev')); // log every request to the console

app.use(session({
	secret: "cat",
	resave: true,
	saveUninitialized: true
}));

app.use(b_parser.json());
app.use(b_parser.urlencoded({ extended: true}));
app.use(cookieParser());

// routes ======================================================================
require('./app/route/api_route/userApi.js')(app);  // RESTful requests
require('./app/route/route.js')(app);  // PAGES requests

app.get('/Quizzipedia/aut', function (req, res) {
    if(req.session.user)
        res.send('sei autenticato come: ' + req.session.user.firstName);
    else
        res.send('non sei autenticato :(');
});

app.listen(port);
