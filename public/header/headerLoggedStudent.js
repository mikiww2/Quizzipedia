/*
 * Nome del file: headerLoggedStudent.js
 * Percorso: public/header/headerLoggedStudent.js
 * Autore: Vault-Tech
 * Data creazione:
 * E-mail: vaulttech.swe@gmail.com
 *
 *  Direttiva per la visualizzazione del header da studente
 *
 * * Diario delle modifiche:
 *
 */

angular.module('Quizzipedia').directive('headerLoggedStudent',function(){
    
    return{
      
        restrict: 'E',
        templateUrl: './public/header/header_loggedStudent.html',
        
    };   
    
    
});