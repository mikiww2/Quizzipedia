/*
 * Nome del file: AuthenticationData.js
 * Percorso: public/services/AuthenticationData.js
 * Autore: Vault-Tech
 * Data creazione:
 * E-mail: vaulttech.swe@gmail.com
 *
 *  Service per i dati di autenticazione
 *
 * * Diario delle modifiche:
 *
 */

angular.module('RequestsManager').factory('AuthenticationData',function(){
	
  function AuthenticationData(newFirstName,newLastName,newMail,newPassword){
      this.firstName = newFirstName;
      this.lastName = newLastName;
      this.mail = newMail;
      this.password = newPassword;
  };
  
  AuthenticationData.prototype.getFirstName = function(){
      return this.firstName;
  };
  
  AuthenticationData.prototype.getLastName = function(){
      return this.lastName;
  };
  
  AuthenticationData.prototype.getMail = function(){
      return this.mail;
  };
  
  AuthenticationData.prototype.setPassword = function(oldPsw,newPsw){
      
      if(newPsw.length >= 8 && oldPsw == this.password ){
	   this.password = newPsw;
      }
  };
  
  return AuthenticationData;
});
