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

  app.get('/api/institution/fetch_all_inst_infos',function (req, res, next) {
    institutionM.fetchAllInstInfos(req, res);
  });

  app.get('/api/institution/fetch_user_inst',function (req, res, next) {
    institutionM.fetchUserInst(req, res);
  });

  app.get('/api/institution/fetch_no_user_inst',function (req, res, next) {
    institutionM.fetchNoUserInst(req, res);
  });

  app.get('/api/institution/fetch_users_in_inst',function (req, res, next) {
    institutionM.fetchUsersInInst(req, res);
  });

  app.post('/api/institution/change_inst',function (req, res, next) {
    institutionM.changeInst(req, res);
  });

  app.post('/api/institution/remove_from_inst',function (req, res, next) {
    institutionM.removeFromInst(req, res);
  });

};  
 
