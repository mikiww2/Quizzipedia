var mongoose = require('mongoose');

var Organisation = require('../model/organization.model'); 

var database = require('../../config/database');
mongoose.connect(database.localUrl);

var org = new Organisation();

org.creationDate = new Date();
org.name = "Scuola Guida Montello";  //non modificare per testare
org.director = "director@gmail.com";

org.save(function (err) {
  if (err) {
      console.log('errore nel salvataggio ente: ' + err);
  }
  else {
      console.log('salvato ente: ' + org);
  }
});