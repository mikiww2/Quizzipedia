/*
 * Nome del file: headerLoggedDirector.js
 * Percorso: public/header/headerLoggedDirector.js
 * Autore: Vault-Tech
 * Data creazione:
 * E-mail: vaulttech.swe@gmail.com
 *
 *  Direttiva per la visualizzazione del header da responsabili
 *
 * * Diario delle modifiche:
 *
 */

angular.module('Quizzipedia').directive('headerLoggedDirector',function(){
    
    return {
      restrict: 'E',
        templateUrl: './public/header/header_loggedDirector.html'
    };
    
});