/*
 * Nome del file: createQmultiple.js
 * Percorso: public/question_creation/createQmultiple.js
 * Autore: Vault-Tech
 * Data creazione:
 * E-mail: vaulttech.swe@gmail.com
 *
 *  Direttiva per la creazione di domanda a tipo risposta multipla
 *
 * * Diario delle modifiche:
 *
 */

angular.module('CreateQuestion').directive('createQmultiple',function(){
    return {
        restrict: 'E',
        templateUrl: './public/question_creation/createQMultiple.html'
    };
});