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

var nodemailer = require('nodemailer');
var randomstring = require("randomstring");

var User = require('../model/user.model');

exports.signin = function (req, res) {

    var email = req.body.email;
    var pass = req.body.password;
    User.findOne({ '_id': email }, function(err, user) {
        if (err) {
            console.log('error: ' + err);
            res.redirect('/Quizzipedia/signin');
        }
        else {
            if (user) {  //SE TROVA UN UTENTE NEL DB
                if (user.checkPassword(pass)) {  //SE LA PASS CORRISPONDE
                    console.log('user trovato: ' + user._id + ' con pass corretta');
                    req.session.user = {
                        _id: user._id
                        ,firstName: user.firstName
                        ,lastName: user.lastName
                        ,password: user.password
                        ,institution: 'none'
                        ,role: 'noRole'
                    };

                    console.log(user);
                    res.redirect('/');
                }
                else {  //SE LA PASS NON CORRISPONDE
                    console.log('user trovato: ' + user._id + ' con pass errata');
                    res.redirect('/Quizzipedia/signin');
                }
            }
            else {  //SE NON TROVA UN UTENTE NEL DB
                console.log('user non trovato');
                res.redirect('/Quizzipedia/signin');
            }
        }
    });
};

exports.signin_with_token = function(req, res) {

    var email = req.body.email;
    var pass = req.body.password;
    User.findOne({ '_id': email }, function(err, user) {
        if (err) {
            console.log('error: ' + err);
            res.redirect('/Quizzipedia/signin');
        }
        else {
            if (user) {  //SE TROVA UN UTENTE NEL DB
                if (user.tmpPassword == pass) {  //SE LA PASS CORRISPONDE
                    console.log('user trovato: ' + user._id + ' con pass corretta');
                    req.session.user = user;
                    //req.session.pswd = user.password;
                    res.redirect('/Quizzipedia/profile/change_pswd');
                }
                else {  //SE LA PASS NON CORRISPONDE
                    console.log('user trovato: ' + user._id + ' con pass errata');
                    res.redirect('/Quizzipedia/signin');
                }
            }
            else {  //SE NON TROVA UN UTENTE NEL DB
                console.log('user non trovato');
                res.redirect('/Quizzipedia/signin');
            }
        }
    });
};

exports.signup = function (req, res) {

    var email = req.body.email;
    User.findOne({ '_id': email }, function(err, user) {
        if (err) {
            console.log('error: ' + err);
            res.redirect('/Quizzipedia/signup');
        }
        else {
            if (user) { //SE LA EMAIL è GIA PRESENTE NEL DB
                console.log('user gia esistente: ' + user.email);
                res.redirect('/Quizzipedia/signup');
            }
            else { //SE LA EMAIL NON è PRESENTE NEL DB
                console.log('account disponibile ' + email);
                new User({
                    firstName: req.body.firstName
                    ,lastName: req.body.lastName
                    ,_id: req.body.email
                    ,password: req.body.password
                }).save(function (err) {
                    if (err) {
                        console.log('errore nel salvataggio utente: ' + err);
                    }
                    else {
                        console.log('salvato utente: ' + email);
                        //res.json({'ok' : true, 'msg' : 'utente salvato ' + email});

                        //req.session.user = newUser;
                    }
                });
                res.redirect('/');
                //res.json({'ok' : true, 'msg' : 'utente salvato ' + email});
                
            }
        }
    });
};

exports.recoverPswd = function (req, res) {

    var email = req.body.email;
    User.findOne({ '_id': email }, function (err, user) {
        if (err) {
            console.log('error: ' + err);
            res.redirect('/Quizzipedia/recover_pswd');
        }
        else {
            if (user) {  //SE TROVA UN UTENTE NEL DB
                var token = randomstring.generate(16);
                console.log(token);
                var transporter = nodemailer.createTransport('smtps://helpservice.quizzipedia%40gmail.com:n54t1r2!@smtp.gmail.com');
                var mailOptions = {
                    from: '"Quizzipedia Help Service" <helpservice.quizzipedia@gmail.com>', // sender address
                    to: email, // list of receivers
                    subject: 'Recover Password', // Subject line
                    text: 'Follow the link to recover your password: http://vault-tech.tk:8080/Quizzipedia/signin', // plaintext body
                    html: '<p>Follow this <a href="http://vault-tech.tk:8080/Quizzipedia/signin_with_token">link</a> to signin with this temporary password:<br><br>'+token+'</p>' // html body
                };
                transporter.sendMail(mailOptions, function(error, info){
                    if(error){
                        return console.log(error);
                    }
                    console.log('Message sent: ' + info.response);
                });
                user.tmpPassword = token;
                user.save(function (err) {
                    if (err) return handleError(err);
                    res.redirect('/Quizzipedia/signin');
                });
            }
            else {  //SE NON TROVA UN UTENTE NEL DB
                console.log('user non trovato');
                res.redirect('/Quizzipedia/signup');
            }
        }
    });
};
