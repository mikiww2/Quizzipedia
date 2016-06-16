/*
 * Nome del file: authApi.js
 * Percorso: app/route/api_route/authApi.js
 * Autore: Vault-Tech
 * Data creazione:
 * E-mail: vaulttech.swe@gmail.com
 *
 *  Api che gestisce l'autenticazione
 *
 * * Diario delle modifiche:
 *
 */


var adminM = require('../../controller/adminManager');

module.exports = function (app) {

  app.post('/api/admin/save_comunication',function (req, res, next) {
    adminM.saveComunication(req, res);
  });

  app.get('/api/auth/fetch_comunication',function (req, res, next) {
    adminM.fetchComunications(req, res);
  });

  app.post('/api/auth/create_new_institution',function (req, res, next) {
    adminM.createNewInstitution(req, res);
  });

}; 