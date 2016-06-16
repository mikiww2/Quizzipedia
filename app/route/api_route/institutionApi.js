/*
 * Nome del file: institutionApi.js
 * Percorso: app/route/api_route/institutionApi.js
 * Autore: Vault-Tech
 * Data creazione:
 * E-mail: vaulttech.swe@gmail.com
 *
 *  Api che gestisce le richieste da parte del client relative agli enti
 *
 * * Diario delle modifiche:
 *
 */

var institutionM = require('../../controller/institutionManager');

module.exports = function (app) {

  app.get('/api/institution/fetch_all_inst_infos',function (req, res, next) { //informazioni generali enti anche x utente non loggato
    institutionM.fetchAllInstInfos(req, res);
  });

  app.get('/api/institution/fetch_user_inst',function (req, res, next) { //enti e ruoli nei quali è iscritto l'utente
    institutionM.fetchUserInst(req, res);
  });

  app.get('/api/institution/fetch_number_teachers',function (req, res, next) { //numero docenti nell'ente
    institutionM.fetchNumberTeachers(req, res);
  });

  app.get('/api/institution/fetch_number_students',function (req, res, next) { //numero studenti nell'ente
    institutionM.fetchNumberStudents(req, res);
  });

  app.get('/api/institution/fetch_users_in_inst',function (req, res, next) { 
    institutionM.fetchUsersInInst(req, res);
  });

  app.get('/api/institution/fetch_no_user_inst',function (req, res, next) { //enti nei quali non è l'utente
    institutionM.fetchNoUserInst(req, res);
  });

  app.post('/api/institution/change_inst',function (req, res, next) {
    institutionM.changeInst(req, res);
  });

  app.post('/api/institution/remove_from_inst',function (req, res, next) {
    institutionM.removeFromInst(req, res);
  });

  app.post('/api/institution/create_new_institution',function (req, res, next) {
    institutionM.createNewInstitution(req, res);
  });

};  
 
