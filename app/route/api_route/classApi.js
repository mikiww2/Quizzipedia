/*
 * Nome del file: classApi.js
 * Percorso: app/route/api_route/classApi.js
 * Autore: Vault-Tech
 * Data creazione:
 * E-mail: vaulttech.swe@gmail.com
 *
 *  Api che gestisce le richieste da parte del client relative alle classi
 *
 * * Diario delle modifiche:
 *
 */

var classM = require('../../controller/classManager');

module.exports = function (app) {

  app.get('/api/class/fetch_inst_classes',function (req, res, next) {
    classM.fetchInstClasses(req, res);
  });

  app.get('/api/class/fetch_no_user_class',function (req, res, next) {
    classM.fetchNoUserClass(req, res);
  });

  app.get('/api/class/fetch_classes_list',function (req, res, next) { //ritorna nome e id delle classi
    classM.fetchClassesList(req, res);                                //in cui si trova il docente
  });                                                                 //o tutte se è responsabile

  app.get('/api/class/fetch_classes_details',function (req, res, next) { //come la precedente ma in piu
    classM.fetchClassesDetails(req, res);                                //ritorna anche numero di
  });                                                                    //docenti e studenti 

  app.post('/api/class/fetch_class_members',function (req, res, next) {
    classM.fetchClassMembers(req, res);
  });

  app.get('/api/class/fetch_classes_with_quiz',function (req, res, next) {
    classM.fetchClassesWithQuiz(req, res);
  }); 

  app.post('/api/class/remove_from_class',function (req, res, next) {
    classM.removeFromClass(req, res);
  });

  app.post('/api/class/create_class',function (req, res, next) {
    classM.createClass(req, res);
  });

  app.post('/api/class/update_class',function (req, res, next) {
    classM.updateClass(req, res);
  });

  app.post('/api/class/remove_class',function (req, res, next) {
    classM.removeClass(req, res);
  });

};
