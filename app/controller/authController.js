var User = require('../model/user.model');

exports.signin = function (req, res) {

    var email = req.body.email;
    var pass = req.body.password;
    User.findOne({'_id': email}, function (err, user) {
        if (err) {
            console.log('error: ' + err);
            res.redirect('/Quizzipedia/signin');
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
    User.findOne({'_id': email}, function (err, user) {
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
                var newUser = new User();
                newUser.firstName = req.body.firstName;
                newUser.lastName = req.body.lastName;
                newUser._id = req.body.email;
                newUser.password = req.body.password;
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
