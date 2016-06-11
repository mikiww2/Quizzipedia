/*
 * Nome del file: profileApi.js
 * Percorso: app/route/api_route/profileApi.js
 * Autore: Vault-Tech
 * Data creazione:
 * E-mail: vaulttech.swe@gmail.com
 *
 *  Api che gestisce le richieste da parte del client relative al profilo utente
 *
 * * Diario delle modifiche:
 *
 */

var profileM = require('../../controller/profileManager');

module.exports = function (app) {

  app.get('/api/profile/get_user',function (req, res, next) {
    profileM.getUser(req, res);
  });

  app.get('/api/profile/get_full_info_user',function (req, res, next) {
    profileM.getFullInfoUser(req, res);
  });

  app.post('/api/profile/set_pswd',function (req, res, next) {
    profileM.setPassword(req, res);
  });

};
