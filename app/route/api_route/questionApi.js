/*
 * Nome del file: questionApi.js
 * Percorso: app/route/api_route/questionApi.js
 * Autore: Vault-Tech
 * Data creazione:
 * E-mail: vaulttech.swe@gmail.com
 *
 *  Api che gestisce le richieste da parte del client relative alle domande
 *
 * * Diario delle modifiche:
 *
 */

var questionM = require('../../controller/questionsManager');

module.exports = function (app) {

  app.post('/api/question/save',function (req, res, next) {
    questionM.save(req, res);
  });

  app.post('/api/question/erase',function (req, res, next) {
    questionM.erase(req, res);
  });

  app.post('/api/question/search',function (req, res, next) {
    questionM.search(req, res);	
  });

  app.get('/api/question/fetch_questions_number',function (req, res, next) { //numero domande nell'istituto
    questionM.fetchQuestionsNumber(req, res);
  });

  app.get('/api/question/fetch_teacher_questions',function (req, res, next) { //numero domande nell'istituto
    questionM.fetchTeacherQuestions(req, res);
  });

  app.get('/api/question/fetch_quiz_questions',function (req, res, next) { //numero domande nell'istituto
    questionM.fetchQuizQuestions(req, res);
  });

}; 
 
