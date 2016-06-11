/*
 * Nome del file: profileManager.js
 * Percorso: app/controller/profileManager.js
 * Autore: Vault-Tech
 * Data creazione:
 * E-mail: vaulttech.swe@gmail.com
 *
 *  Controller per il reperimento di un utente, modifica password nel database
 *
 * * Diario delle modifiche:
 *
 */

var User = require('../model/user.model');
var Organization = require('../model/organization.model');

exports.getUser = function (req, res) {

		var email = req.session.user._id;
		User.findOne({'_id': email}, function (err, user) {
        if (err) {
            console.log('error: ' + err);
            res.redirect('/Quizzipedia/signin');
        }
        else {
            if (user) {  //SE TROVA UN UTENTE NEL DB
                res.send(user);
            }
            else {  //SE NON TROVA UN UTENTE NEL DB
                console.log('user non trovato');
                res.redirect('/Quizzipedia/signin');
            }
        }
    });
};

exports.getFullInfoUser = function (req, res) {

        if(req.session.user != undefined){
            res.send(req.session.user);
        }
};

exports.setPassword = function (req, res) {

    var email = req.session.user._id;
    var new_pswd = req.body.newPswd1;
    User.findOne({'_id': email, 'password': req.body.oldPswd}, function (err, user) {
        if (err) {
            console.log('error: ' + err);
            res.redirect('/Quizzipedia/signin');
        }
        else {
            if (user) {  //SE TROVA UN UTENTE NEL DB
            		user.password = new_pswd;
            		user.tmpPassword = undefined;
            		user.save(function(){
            			console.log('nuova pswd impostata: ' + new_pswd);
            			res.redirect('/');
            		});
            }
            else {  //SE NON TROVA UN UTENTE NEL DB
                console.log('user non trovato o pswd errata');
                res.redirect('/Quizzipedia/signin');
            }
        }
    });
};
/*
exports.getPassword = function (req, res) {

		var email = req.session.user._id;
		User.findOne({'_id': email}, function (err, user) {
        if (err) {
            console.log('error: ' + err);
            res.redirect('/Quizzipedia/signin');
        }
        else {
            if (user) {  //SE TROVA UN UTENTE NEL DB
            		res.send(user);
            }
            else {  //SE NON TROVA UN UTENTE NEL DB
                console.log('user non trovato');
                res.redirect('/Quizzipedia/signin');
            }
        }
    });
};*/
