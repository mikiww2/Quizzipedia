var path = require('path');

module.exports = function (app) {

  //TEST ROUTING -----------------------------------------------------------------------------
  app.route('/Quizzipedia/user').get(function (req, res) {
    if (!req.session.user)
      res.redirect('/');
    else
      res.sendFile(path.resolve('./public/test_user/userDetails.html'));
  });

  // BASIC -----------------------------------------------------------------------------------
  app.route('/').get(function (req, res) {
    res.redirect('/Quizzipedia/home');
  });

  app.route('/Quizzipedia').get(function (req, res) {
    res.redirect('/Quizzipedia/home');
  });

  app.route('/Quizzipedia/home').get(function (req, res) {
    res.sendFile(path.resolve('./public/home/home.html'));
  });

  // AUTHENTICATION --------------------------------------------------------------------------
  app.route('/Quizzipedia/signin').get(function (req, res) {
    if (req.session.user)
      res.redirect('/');
    else
      res.sendFile(path.resolve('./public/authentic/signin.html'));
  });

  app.route('/Quizzipedia/signin_with_token').get(function (req, res) {
    if (req.session.user)
      res.redirect('/');
    else
      res.sendFile(path.resolve('./public/authentic/signin_with_token.html'));
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

  // PROFILE -------------------------------------------------------------------------------------
  app.route('/Quizzipedia/profile').get(function (req, res) {
    if (req.session.user)
      res.sendFile(path.resolve('./public/profile/profile.html'));
    else
      res.redirect('/Quizzipedia/home');
  });

  app.route('/Quizzipedia/recover_pswd').get(function (req, res) {
    if (req.session.user)
      res.redirect('/');
    else
      res.sendFile(path.resolve('./public/authentic/recover_pswd.html'));
  });

  app.route('/Quizzipedia/profile/change_pswd').get(function (req, res) {
    if (req.session.user)
      res.sendFile(path.resolve('./public/profile/changePswd.html'));
    else
      res.redirect('/Quizzipedia/home');
  });

  //ABOUT US ---------------------------------------------------------------------------------------
  app.route('/Quizzipedia/aboutUs').get(function (req, res) {
    res.sendFile(path.resolve('./public/aboutUs.html'));
  });

  //SEARCH ---------------------------------------------------------------------------------------
  app.route('/Quizzipedia/searchQuiz').get(function (req, res) {
    res.sendFile(path.resolve('./public/search/searchQuizzes.html'));
  });

  //QUESTIONS ---------------------------------------------------------------------------------------
  app.route('/Quizzipedia/createQuestion').get(function (req, res) {
    res.sendFile(path.resolve('./public/question_creation/createQuestionBase.html'));
  });
    
    
//QUESTIONS MANAGE------------------------------------------------------------------------    
    
 app.route('/Quizzipedia/mgmtQuestion').get(function (req, res) {
    res.sendFile(path.resolve('./public/question_creation/questionMgmt.html'));
  });
};