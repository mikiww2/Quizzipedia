var mongoose = require('mongoose');

var User = require('../model/user.model')(mongoose);

exports.signin = function (req, res) {

    var email = req.body.email;
    var pass = req.body.pass;
    User.findOne({'_id': email}, function (err, user) {
        if (err) {
            console.log('error: ' + err);
            res.redirect('/Quizzipedia/login');
        }
        else {
            if (user) {  //SE TROVA UN UTENTE NEL DB
                if (user.password == pass) {  //SE LA PASS CORRISPONDE
                    console.log('user trovato: ' + user._id + ' con pass corretta');
                    req.session.user = user;
                    res.redirect('/');
                }
                else {  //SE LA PASS NON CORRISPONDE
                    console.log('user trovato: ' + user._id + ' con pass errata');
                    res.redirect('/Quizzipedia/login');
                }
            }
            else {  //SE NON TROVA UN UTENTE NEL DB
                console.log('user non trovato');
                res.redirect('/Quizzipedia/login');
            }
        }
    });
};

exports.logout = function (req, res) {
    console.log('utente sloggato: ' + req.session.user);
    delete req.session.user;
    res.redirect('/');
};

exports.signup = function (req, res) {

    var email = req.body.email;
    User.findOne({'_id': email}, function (err, user) {
        if (err) {
            console.log('error: ' + err);
            res.redirect('/Quizzipedia/register');
        }
        else {
            if (user) { //SE LA EMAIL è GIA PRESENTE NEL DB
                console.log('user gia esistente: ' + user.email);
                res.redirect('/Quizzipedia/register');
            }
            else { //SE LA EMAIL NON è PRESENTE NEL DB
                console.log('account disponibile ' + email);
                var newUser = new User();
                newUser.firstName = req.body.name;
                newUser.lastName = req.body.surname;
                newUser._id = req.body.email;
                newUser.password = req.body.pass;
                //newUser.typeUser = 'basic';
                newUser.save(function (err) {
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
