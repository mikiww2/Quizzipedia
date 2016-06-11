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

  app.get('/api/class/fetch_teacher_classes_list',function (req, res, next) {
    classM.fetchTeacherClassesList(req, res);
  });

  app.get('/api/class/fetch_teacher_classes_details',function (req, res, next) {
    classM.fetchTeacherClassesDetails(req, res);
  });

  app.get('/api/class/fetch_class_members',function (req, res, next) {
    classM.fetchClassMembers(req, res);
  });

	app.get('/api/class/fetch_inst_classes',function (req, res, next) {
    classM.fetchInstClasses(req, res);
  });

  app.get('/api/class/fetch_no_user_class',function (req, res, next) {
    classM.fetchNoUserClass(req, res);
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
