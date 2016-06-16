/*
 * Nome del file: comunicationApi.js
 * Percorso: app/route/api_route/comunicationApi.js
 * Autore: Vault-Tech
 * Data creazione:
 * E-mail: vaulttech.swe@gmail.com
 *
 *  Api che gestisce le comunicazioni e creazione di istituto
 *
 * * Diario delle modifiche:
 *
 */


var adminM = require('../../controller/adminManager');

module.exports = function (app) {

  app.post('/api/admin/save_comunication',function (req, res, next) {
    adminM.saveComunication(req, res);
  });

  app.get('/api/admin/fetch_comunications',function (req, res, next) {
    adminM.fetchComunications(req, res);
  });

  app.post('/api/admin/remove_comunications',function (req, res, next) {
    adminM.removeComunications(req, res);
  });

}; 