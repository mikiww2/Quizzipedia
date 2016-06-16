/*
 * Nome del file: route.js
 * Percorso: app/route/route.js
 * Autore: Vault-Tech
 * Data creazione:
 * E-mail: vaulttech.swe@gmail.com
 *
 *  Routing che associa le api al client
 *
 * * Diario delle modifiche:
 *
 */

var path = require('path');

module.exports = function (app) {   
    
    

  //TEST ROUTING -----------------------------------------------------------------------------

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

  app.route('/Quizzipedia/profile/changePswd').get(function (req, res) {
    if (req.session.user)
      res.sendFile(path.resolve('./public/profile/changePswd.html'));
    else
      res.redirect('/Quizzipedia/home');
  });

   // REQUESTS -------------------------------------------------------------------------------------
  app.route('/Quizzipedia/sendRequest').get(function (req, res) {
    if (req.session.user)
      res.sendFile(path.resolve('./public/requests/sendRequest.html'));
    else
      res.redirect('/Quizzipedia/home');
  });

 app.route('/Quizzipedia/viewPendingRequests').get(function (req, res) {
    if (req.session.user)
      res.sendFile(path.resolve('./public/requests/viewPendingRequests.html'));
    else
      res.redirect('/Quizzipedia/home');
  });
    
  // INST & CLASSES -------------------------------------------------------------------------------------
  app.route('/Quizzipedia/instClassesMgmt').get(function (req, res) {
    if (req.session.user)
      res.sendFile(path.resolve('./public/orgManager/instClassesMgmt.html'));
    else
      res.redirect('/Quizzipedia/home');
  });
 
  app.route('/Quizzipedia/classList').get(function (req, res) {
    if (req.session.user)
      res.sendFile(path.resolve('./public/orgManager/classList.html'));
    else
      res.redirect('/Quizzipedia/home');
  });
    
  app.route('/Quizzipedia/instList').get(function (req, res) {
    res.sendFile(path.resolve('./public/orgManager/instList.html'));   
  });
    
  // TOPICS -------------------------------------------------------------------------------------
  app.route('/Quizzipedia/topicList').get(function (req, res) {
    if (req.session.user)
      res.sendFile(path.resolve('./public/topics/topicList.html'));
    else
      res.redirect('/Quizzipedia/home');
  });
    
  app.route('/Quizzipedia/topicMgmt').get(function (req, res) {
    if (req.session.user)
      res.sendFile(path.resolve('./public/topics/topicMgmt.html'));
    else
      res.redirect('/Quizzipedia/home');
  });
    
  // TOPICS -------------------------------------------------------------------------------------
  app.route('/Quizzipedia/removeUser').get(function (req, res) {
    if (req.session.user)
      res.sendFile(path.resolve('./public/users/removeUser.html'));
    else
      res.redirect('/Quizzipedia/home');
  });

  //ABOUT US ---------------------------------------------------------------------------------------
  app.route('/Quizzipedia/aboutUs').get(function (req, res) {
    res.sendFile(path.resolve('./public/aboutUs.html'));
  });

  //ISSUES
  app.route('/Quizzipedia/issues').get(function (req, res) {
    res.sendFile(path.resolve('./public/issues/issues.html'));
  });

  //SEARCH ---------------------------------------------------------------------------------------
  app.route('/Quizzipedia/searchQuiz').get(function (req, res) {
    res.sendFile(path.resolve('./public/search/searchQuizzes.html'));
  });

  //QUESTIONS ---------------------------------------------------------------------------------------
  app.route('/Quizzipedia/createQuestion').get(function (req, res) {
    if (req.session.user)
      res.sendFile(path.resolve('./public/question_creation/createQuestionBase.html'));
    else
      res.redirect('/Quizzipedia/home');
  });    
    
  //QUESTIONS MANAGE------------------------------------------------------------------------    
    
  app.route('/Quizzipedia/questionMgmt').get(function (req, res) {
    res.sendFile(path.resolve('./public/question_creation/questionMgmt.html'));
  });
    
  //QUIZ -------------------------------------------------------------------------------------------
  app.route('/Quizzipedia/quizMgmt').get(function (req, res) {
      if (req.session.user)
          res.sendFile(path.resolve('./public/quiz_creation/quizMgmt.html'));
      else
         res.redirect('/Quizzipedia/home'); 
  });
    
  app.route('/Quizzipedia/createQuiz').get(function (req, res) {
      if (req.session.user)
          res.sendFile(path.resolve('./public/quiz_creation/createQuiz.html'));
      else
         res.redirect('/Quizzipedia/home'); 
  });
    
  app.route('/Quizzipedia/quizExec').get(function (req, res) {
    res.sendFile(path.resolve('./public/quiz_execution/quizExec.html'));
  });

  app.route('/Quizzipedia/privateQuizzes').get(function (req, res) {
    res.sendFile(path.resolve('./public/orgManager/privateQuizzesList.html'));
  });
   
    app.route('/Quizzipedia/quizHistory').get(function (req, res) {
      if (req.session.user)
          res.sendFile(path.resolve('./public/quiz_execution/quizHistory.html'));
      else
         res.redirect('/Quizzipedia/home'); 
  });
    
      
  // STATISTICS -------------------------------------------------------------------------------------
  app.route('/Quizzipedia/questionStats').get(function (req, res) {
    if (req.session.user)
      res.sendFile(path.resolve('./public/statistics/viewQuestionStats.html'));
    else
      res.redirect('/Quizzipedia/home');
  });

  app.route('/Quizzipedia/quizStats').get(function (req, res) {
    if (req.session.user)
      res.sendFile(path.resolve('./public/statistics/viewQuizStats.html'));
    else
      res.redirect('/Quizzipedia/home');
  });

  app.route('/Quizzipedia/studentsStats').get(function (req, res) {
    if (req.session.user)
      res.sendFile(path.resolve('./public/statistics/viewStudentsStats.html'));
    else
      res.redirect('/Quizzipedia/home');
  });

  app.route('/Quizzipedia/teachersStats').get(function (req, res) {
    if (req.session.user)
      res.sendFile(path.resolve('./public/statistics/viewTeachersStats.html'));
    else
      res.redirect('/Quizzipedia/home');
  });

};