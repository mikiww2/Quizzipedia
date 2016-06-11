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


var authenticationM = require('../../controller/authenticationManager');

module.exports = function (app) {

  app.post('/api/auth/signin',function (req, res, next) {
    authenticationM.signin(req, res);
  });

  app.post('/api/auth/signin_with_token',function (req, res, next) {
    authenticationM.signin_with_token(req, res);
  });

  app.post('/api/auth/signup',function (req, res, next) {
    authenticationM.signup(req, res);
  });

  app.post('/api/auth/recover_pswd',function (req, res, next) {
    authenticationM.recoverPswd(req, res);
  });

}; 
