/*
 * Nome del file: topicApi.js
 * Percorso: app/route/api_route/topicApi.js
 * Autore: Vault-Tech
 * Data creazione:
 * E-mail: vaulttech.swe@gmail.com
 *
 *  Api che gestisce le richieste da parte del client relative agli argomenti
 *
 * * Diario delle modifiche:
 *
 */

var topicM = require('../../controller/topicManager');

module.exports = function (app) {

	app.get('/api/topic/fetch',function (req, res, next) {
    topicM.fetch(req, res);
  });

  app.get('/api/topic/fetch_all',function (req, res, next) {
    topicM.fetchAll(req, res);
  });

	app.post('/api/topic/save',function (req, res, next) {
    topicM.save(req, res);
  });

  app.post('/api/topic/erase',function (req, res, next) {
    topicM.erase(req, res);
  });

}; 
