/*
 * Nome del file: server.js
 * Percorso: server.js
 * Autore: Vault-Tech
 * Data creazione:
 * E-mail: vaulttech.swe@gmail.com
 *
 *  File di avvio del prodotto
 *
 * * Diario delle modifiche:
 *
 */

// set up ======================================================================
var express = require('express');
var app = express(); 						// create our app w/ express
var mongoose = require('mongoose'); 				// mongoose for mongodb
var server = require('./config/server'); 				// set the port
var database = require('./config/database'); 			// load the database config
var cookieParser = require('cookie-parser');
var session = require('express-session');
var b_parser = require('body-parser');
var morgan = require('morgan');

// configuration ===============================================================
mongoose.connect(database.localUrl, function (err) {
    if (err)
        console.log('Errore di connessione al database');
}); 	// Connect to local MongoDB instance.
app.use('/Quizzipedia',express.static(__dirname));  // statics resources for all /Quizzipedia path
app.use('/Quizzipedia/profile',express.static(__dirname));  // statics resources for all /Quizzipedia/profile path

app.use(morgan('dev')); // log every request to the console

app.use(session({
	secret: "cat",
	resave: true,
	saveUninitialized: true,
	cookie: { maxAge: server.cookieAge } // session maxAge defined in config/server.js
}));

app.use(b_parser.json());
app.use(b_parser.urlencoded({ extended: true}));
app.use(cookieParser());

// routes ======================================================================
require('./app/route/api_route/authApi.js')(app);  // RESTful requests
require('./app/route/api_route/profileApi.js')(app);  // RESTful requests
require('./app/route/api_route/classApi.js')(app);  // RESTful requests
require('./app/route/api_route/questionApi.js')(app);  // RESTful requests
require('./app/route/api_route/quizApi.js')(app);  // RESTful requests
require('./app/route/api_route/requestsApi.js')(app);  // RESTful requests
require('./app/route/api_route/searchApi.js')(app);  // RESTful requests
require('./app/route/api_route/institutionApi.js')(app);  // RESTful requests
require('./app/route/api_route/uploadApi.js')(app);  // RESTful requests
require('./app/route/api_route/topicApi.js')(app);  // RESTful requests
require('./app/route/api_route/statisticApi.js')(app);  // RESTful requests
require('./app/route/api_route/comunicationApi.js')(app);  // RESTful requests

require('./app/route/route.js')(app);  // PAGES requests

app.get('/Quizzipedia/aut', function (req, res) {
    if(req.session.user)
        res.send('sei autenticato come: ' + req.session.user.firstName);
    else
        res.send('non sei autenticato :(');
});

app.listen(server.port);

console.log("server quizzipedia avviato sulla porta: " + server.port);