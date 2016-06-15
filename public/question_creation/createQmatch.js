/*
 * Nome del file: createQmatch.js
 * Percorso: public/question_creation/createQmatch.js
 * Autore: Vault-Tech
 * Data creazione:
 * E-mail: vaulttech.swe@gmail.com
 *
 *  Direttiva per la creazione di domanda a collegameto
 *
 * * Diario delle modifiche:
 *
 */

angular.module('CreateQuestion').directive('createQmatch',function(){
    
    return {
        restrict: 'E',
        templateUrl: './public/question_creation/createQMatch.html'
    };
});