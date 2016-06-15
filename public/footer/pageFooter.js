/*
 * Nome del file: pageFooter.js
 * Percorso: public/footer/pageFooter.js
 * Autore: Vault-Tech
 * Data creazione:
 * E-mail: vaulttech.swe@gmail.com
 *
 *  Direttiva per il footer del sito
 *
 * * Diario delle modifiche:
 *
 */

angular.module('Quizzipedia').directive('pageFooter',function(){
    
    return {
      
        restrict: 'E',
        templateUrl: './public/footer/footer.html'
    };
    
});