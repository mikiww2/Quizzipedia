/*
 * Nome del file: quizApi.js
 * Percorso: app/route/api_route/quizApi.js
 * Autore: Vault-Tech
 * Data creazione:
 * E-mail: vaulttech.swe@gmail.com
 *
 *  Api che gestisce le richieste da parte del client relative ai quiz
 *
 * * Diario delle modifiche:
 *
 */

var quizM = require('../../controller/quizManager');

module.exports = function (app) {

  app.get('/api/quiz/fetch_user_quiz',function (req, res, next) { //quiz creati dal docente loggato
    quizM.fetchUserQuiz(req, res);
  });

  app.get('/api/quiz/fetch_all_quiz',function (req, res, next) { //tutti i quiz dell'ente, non so se serva
    quizM.fetchAllQuiz(req, res);
  });

  app.get('/api/quiz/fetch_quiz_number',function (req, res, next) { //numero quiz nell'istituto
    quizM.fetchQuizNumber(req, res);
  });

  app.get('/api/quiz/fetch_public_quiz',function (req, res, next) { //quiz dell'ente pubblici
    quizM.fetchPublicQuiz(req, res);
  });

  app.post('/api/quiz/search',function (req, res, next) { //ricerca quiz
    quizM.search(req, res);
  });

  app.post('/api/quiz/save',function (req, res, next) { //salvataggio quiz
    quizM.save(req, res);
  });

}; 
 