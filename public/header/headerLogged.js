/*
 * Nome del file: headerLogged.js
 * Percorso: public/header/headerLogged.js
 * Autore: Vault-Tech
 * Data creazione:
 * E-mail: vaulttech.swe@gmail.com
 *
 *  Direttiva per la visualizzazione del header da loggati senza ruolo
 *
 * * Diario delle modifiche:
 *
 */

angular.module('Quizzipedia').directive('headerLogged',function(){
    
    return{
      restrict: 'E',
        templateUrl: './public/header/header_logged.html'
    };
});