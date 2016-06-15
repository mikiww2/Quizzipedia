/*
 * Nome del file: authenticationManager.js
 * Percorso: app/controller/authenticationManager.js
 * Autore: Vault-Tech
 * Data creazione:
 * E-mail: vaulttech.swe@gmail.com
 *
 *  Controller per il recupero della password, la registrazione account e il login
 *
 * * Diario delle modifiche:
 *
 */

var Comunication = require('../model/comunication.model');
var Organization = require('../model/organization.model');

exports.saveComunication = function (req, res) {

    new Comunication({
        email: req.body.email,
        message: req.body.message
    }).save(function (err) {
        if (err) {
            console.log('errore nella segnalazione');
            res.send({code: 1, message: 'Segnalazione non inviata!'});
        }
        else {
            console.log('segnalazione ok');
            res.send({code: 0, message: 'La segnalazione è andata a buon fine'});
        }
    };
};

exports.fetchComunications = function (req, res) {

    Comunication.find(function (err, coms) {
        if (err) {
            console.log('error: ' + err);
            res.redirect('/');
        }
        else {
            res.send(coms);
        }
    });
};

exports.createNewInstitution = function(req, res) {


    Organization.find({ $or:[ {'director': req.body.email}, {'name': req.body.orgName} ]}, function (err, orgs) {
        if (err) {
            console.log('error: ' + err);
            res.redirect('/Quizzipedia/signin');
        }
        else {
            if (orgs) { //SE LA EMAIL è GIA PRESENTE NEL DB
                console.log('Ente o responsabile già esistente');
                res.send({ code: 1, message: 'Ente o responsabile già esistente!' });
            }
            else {
                var date = new Date();
                new Organization({
                    name: req.body.orgName,
                    director: req.body.email,
                    creationDate = date
                }).save(function (err) {
                    if (err) {
                        console.log('errore nel salvataggio ente: ' + err);
                        res.send({ code: 1, message: err });
                    }
                    else {
                        console.log('salvato ente: ' + email);
                        res.send({code: 0, message: 'Lacreazione dell\'ente è andata a buon fine'});
                    }
                });
                
            }
        }
    });
};
