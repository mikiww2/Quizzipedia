/*
 * Nome del file: headerNotLogged.js
 * Percorso: public/header/headerNotLogged.js
 * Autore: Vault-Tech
 * Data creazione:
 * E-mail: vaulttech.swe@gmail.com
 *
 *  Direttiva per la visualizzazione del header da non loggati
 *
 * * Diario delle modifiche:
 *
 */

angular.module('Quizzipedia').directive('headerLoggedAdmin',function(){
    
    return{
        restrict: 'E',
        templateUrl: './public/header/header_superAdmin.html'        
    };
    
    
});