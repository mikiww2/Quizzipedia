/*
 * Nome del file: headerLoggedTeacher.js
 * Percorso: public/header/headerLoggedTeacher.js
 * Autore: Vault-Tech
 * Data creazione:
 * E-mail: vaulttech.swe@gmail.com
 *
 *  Direttiva per la visualizzazione del header da docente
 *
 * * Diario delle modifiche:
 *
 */

angular.module('Quizzipedia').directive('headerLoggedTeacher',function(){
    
    return {
      restrict: 'E',
      templateUrl: './public/header/header_loggedTeacher.html'
    };
    
    
});