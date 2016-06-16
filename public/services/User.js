/*
 * Nome del file: User.js
 * Percorso: public/services/User.js
 * Autore: Vault-Tech
 * Data creazione:
 * E-mail: vaulttech.swe@gmail.com
 *
 *  Service per l'utente
 *
 * * Diario delle modifiche:
 *
 */

angular.module('RequestsManager').factory('User',['AuthenticationData',function(AuthenticationData){
  
  function User(firstName,lastName,mail,password){
    
    this.authenticationData = new AuthenticationData(firstName,lastName,mail,password);
    
  };
  
 
  User.prototype.getAuthenticationData = function(){
      return this.authenticationData;
  };
 
  User.prototype.getMail = function(){
     return this.authenticationData.getMail();  
  };
  
  
  
  return User;
  
}]);