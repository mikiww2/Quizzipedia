var path = require('path');
var controller = require('../controller/authController');

module.exports = function (app) {

    app.route('/').get(function (req, res) {
      res.redirect('/Quizzipedia');
    });

    app.route('/Quizzipedia').get(function (req, res) {
      res.sendFile(path.resolve('./public/views/index.html'));
    });

    app.route('/Quizzipedia/users').get(function (req, res) {
      res.sendFile(path.resolve('./public/view/users.html'));
    });

    app.route('/Quizzipedia/signup').get(function (req, res) {
      res.sendFile(path.resolve('./public/view/signup.html'));
    });

    // LOGIN ROUTE
  app.route('/Quizzipedia/login').get(function(req, res) {
    if (req.session.user)
      res.redirect('/');
    else
      res.sendfile('./public/views/login.html');
  });

  app.route('/Quizzipedia/login').post(function (req, res, next) {
    console.log('login post req: ' + req.body.email + ', ' + req.body.pass);
    controller.signin(req, res);
  });

//REGISTER ROUTE
  app.route('/Quizzipedia/register').get(function(req, res) {
    if (req.session.user)
        res.redirect('/');
    else
    res.sendfile('./public/views/register.html');
  });

  app.route('/Quizzipedia/register').post(function (req, res, next) {
    //console.log('register post req: ' +req.body.name + ', ' + req.body.surname + ', ' + req.body.email + ', ' + req.body.pass);
    controller.signup(req, res);
  });

//LOGOUT ROUTE
app.route('/Quizzipedia/logout').get(function (req, res) {
    if (req.session.user)
    controller.logout(req, res);
    else
        res.redirect('/');
});
};