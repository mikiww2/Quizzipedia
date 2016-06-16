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
    });
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

exports.removeComunications = function (req, res) {

    console.log(req.body._id);
    Comunication.remove({ '_id': req.body._id }, function (err){
         if (err) {
            console.log('error: ' + err);
            res.redirect('/');
        }
        else {
            res.send({ code: 0, message: 'Segnalazione rimossa'});
        }
    });
    
};
