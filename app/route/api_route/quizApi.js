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

  app.get('/api/quiz/get_solved_user_quiz',function (req, res, next) { //quiz creati dal docente loggato
    quizM.getSolvedUserQuiz(req, res);
  });

  app.get('/api/quiz/fetch_user_quiz',function (req, res, next) { //quiz creati dal docente loggato
    quizM.fetchUserQuiz(req, res);
  });

  app.get('/api/quiz/fetch_all_quiz',function (req, res, next) { //tutti i quiz dell'ente, non so se serva
    quizM.fetchAllQuiz(req, res);
  });

  app.get('/api/quiz/fetch_quiz_number',function (req, res, next) { //numero quiz nell'istituto
    quizM.fetchQuizNumber(req, res);
  });

  app.post('/api/quiz/prepare_quiz_execution',function (req, res, next) { //quiz dell'ente pubblici
    quizM.prepareQuizExecution(req, res);
  });

  app.get('/api/quiz/fetch_quiz_to_execute',function (req, res, next) { //quiz dell'ente pubblici
    quizM.fetchQuizToExecute(req, res);
  });

  app.post('/api/quiz/search',function (req, res, next) { //ricerca quiz
    quizM.search(req, res);
  });

  app.post('/api/quiz/save',function (req, res, next) { //salvataggio quiz
    quizM.save(req, res);
  });

  app.post('/api/quiz/save_results',function (req, res, next) { //salvataggio quiz
    quizM.saveResults(req, res);
  });

  app.post('/api/quiz/remove',function (req, res, next) { //salvataggio quiz
    quizM.remove(req, res);
  });

  app.post('/api/quiz/fetch_class_quizzes',function (req, res, next) { //quiz dell'ente pubblici
    quizM.fetchClassQuizzes(req, res);
  });

}; 
 