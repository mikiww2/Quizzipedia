var User = require('../model/user.model');
var Organization = require('../model/organisation.model');

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

        var fullUser = {};
        var email = req.session.user._id;
        User.findOne({'_id': email}, function (err, user) {
            if (err) {
                console.log('error: ' + err);
                res.redirect('/Quizzipedia/signin');
            }
            else {
                if (user) {  //SE TROVA UN UTENTE NEL DB
                    fullUser._id = user._id;
                    fullUser.firstName = user.firstName;
                    fullUser.lastName = user.lastName;
                    fullUser.password = user.password;

                    Organization.findOne({'name': 'Scuola Guida Montello'}, function (err, org) {
                        if (err) {
                          console.log('error: ' + err);
                        }
                        else {
                          if (org) {  //SE TROVA UN UTENTE NEL DB
                                console.log('org trovato: ' + org._id);
                                org.users.forEach(function(result,index){
                                    if(result['user'] === user._id) {
                                        fullUser.role = result['role'];
                                        fullUser.state = result['state'];
                                        res.send(fullUser);
                                    }
                                });
                              }
                              else {  //SE NON TROVA UN UTENTE NEL DB
                                console.log('org non trovato');
                            }
                          }
                    });

                // fine organization
                    
                }
                else {  //SE NON TROVA UN UTENTE NEL DB
                    console.log('user non trovato');
                }
            }
        });
};

exports.setPassword = function (req, res) {

    var email = req.session.user._id;
    var new_pswd = req.body.newPswd1;
    User.findOne({'_id': email}, function (err, user) {
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
                console.log('user non trovato');
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
