var path = require('path');

module.exports = function (app) {

    app.route('/').get(function (req, res) {
      res.redirect('/Quizzipedia/home');
    });

    app.route('/Quizzipedia').get(function (req, res) {
      res.redirect('/Quizzipedia/home');
    });

    app.route('/Quizzipedia/home').get(function (req, res) {
      res.sendFile(path.resolve('./public/home/home.html'));
    });

    app.route('/Quizzipedia/users').get(function (req, res) {
      res.sendFile(path.resolve('./public/view/users.html'));
    });

    app.route('/Quizzipedia/signin').get(function (req, res) {
      if (req.session.user)
        res.redirect('/');
      else
        res.sendFile(path.resolve('./public/authentic/signin.html'));
    });

    app.route('/Quizzipedia/signup').get(function (req, res) {
      if (req.session.user)
        res.redirect('/');
      else
        res.sendFile(path.resolve('./public/authentic/signup.html'));
    });

    app.route('/Quizzipedia/signout').get(function (req, res) {
      if (req.session.user){
        var user = req.session.user;
        delete req.session.user;
        console.log('utente sloggato: ' + user);
      }
      res.redirect('/');
    });
};