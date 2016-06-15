/*
 * Nome del file: Director.js
 * Percorso: public/services/Director.js
 * Autore: Vault-Tech
 * Data creazione:
 * E-mail: vaulttech.swe@gmail.com
 *
 *  Service per il responsabile
 *
 * * Diario delle modifiche:
 *
 */

angular.module('RequestsManager').factory('Director',['User',function(User){
    
    function Director(firstName,lastName,mail,password){
        User.call(this,firstName,lastName,mail,password);        
    };    
        
    Director.prototype = User.prototype;    
    
    return Director;    
    
}]);