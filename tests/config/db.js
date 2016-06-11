/*
 * Nome del file: db.js
 * Percorso: test/config/db.js
 * Autore: Vault-Tech
 * Data creazione:
 * E-mail: vaulttech.swe@gmail.com
 *
 *  DESCRIZIONE?
 *
 * * Diario delle modifiche:
 *
 */

'use strict';

// Bring Mongoose into the app
var mongoose = require( 'mongoose' );

// Build the connection string
var database = require('../config/database.test');

// Create the database connection
mongoose.connect(database.localUrl);


// CONNECTION EVENTS
// When successfully connected
mongoose.connection.on('connected', function () {
  console.log('Mongoose default connection open to ' + database.localUrl);
});

// If the connection throws an error
mongoose.connection.on('error',function (err) {
  console.log('Mongoose default connection error: ' + err);
});

// When the connection is disconnected
mongoose.connection.on('disconnected', function () {
  console.log('Mongoose default connection disconnected');
});

// If the Node process ends, close the Mongoose connection
process.on('SIGINT', function() {
  mongoose.connection.close(function () {
    console.log('Mongoose default connection disconnected through app termination');
    process.exit(0);
  });
});

//import db

var Topic = require('../../app/model/topic.model');
var User = require('../../app/model/user.model');

//export
module.exports = {
  mongoose: mongoose
  ,topic: Topic
  ,user: User
};