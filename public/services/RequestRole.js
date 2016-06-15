/*
 * Nome del file: RequestRole.js
 * Percorso: public/services/RequestRole.js
 * Autore: Vault-Tech
 * Data creazione:
 * E-mail: vaulttech.swe@gmail.com
 *
 *  Service per le richieste di ruolo
 *
 * * Diario delle modifiche:
 *
 */

angular.module('RequestsManager').factory('RequestRole',[function(){
    
    function RequestRole(mail,nameOfInstitution,message){
      
        this.mail = mail;
        this.nameInstitution = nameOfInstitution;
        this.message = message;
        
    };
    
    RequestRole.prototype.getMail = function(){
       return this.mail;  
    };
    
    RequestRole.prototype.getNameInstitution = function(){
      return this.nameInstitution;  
    };
    
    RequestRole.prototype.getMessage = function(){
        return this.message;
    };
    
    
    
    return RequestRole;
    
}]);