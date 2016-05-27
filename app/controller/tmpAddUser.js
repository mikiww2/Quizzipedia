var mongoose = require('mongoose');

var Organisation = require('../model/organisation.model');
var User = require('../model/user.model');

var database = require('../../config/database');
mongoose.connect(database.localUrl);

var orgName = "Scuola Guida Montello";  //non modificare per testare altrimenti non funziona

var userInOrg = {
	          "user" : "c@gmail.com", //attenzione inserire la stessa mail sia qui che sotto in userInUsers nel campo _id
          	"role" : "teacher",
          	"message" : "commento",
            "state" : "requested"
          };

var userInUsers = {
                    "_id" : "c@gmail.com",  //idem come sopra deve coincidere con user di userInOrg
                    "firstName" : "Mona",
                    "lastName" : "Me",
                    "password" : "123456789"
                  };

Organisation.findOne({'name': orgName}, function (err, org) {
    if (err) {
      console.log('error: ' + err);
    }
    else {
      if (org) {  //SE TROVA UN UTENTE NEL DB
            console.log('org trovato: ' + org._id);
            org.users.push(userInOrg);
            org.save(function (err) {
						  if (err) {
						      console.log('errore nel salvataggio utente: ' + err);
						  }
						  else {
						      console.log('salvato utente in Organization: ' + org);
						  }
						});
          }
          else {  //SE NON TROVA UN UTENTE NEL DB
          	console.log('org non trovato');
      	}
      }
});

User.findOne({'_id': userInUsers._id}, function (err, user) {
    if (err) {
        console.log('error: ' + err);
    }
    else {
        if (user) { //SE LA EMAIL è GIA PRESENTE NEL DB
            console.log('user gia esistente: ' + userInUsers._id);
        }
        else { //SE LA EMAIL NON è PRESENTE NEL DB
            console.log('account disponibile ');
            var newUser = new User();
            newUser.firstName = userInUsers.firstName;
            newUser.lastName = userInUsers.lastName;
            newUser._id = userInUsers._id;
            newUser.password = userInUsers.password;
            newUser.save(function (err) {
                if (err) {
                    console.log('errore nel salvataggio utente in users: ' + err);
                }
                else {
                    console.log('salvato utente in users');
                }
            });
            
        }
    }
}); 
