/*
 * Nome del file: createQopen.js
 * Percorso: public/question_creation/createQopen.js
 * Autore: Vault-Tech
 * Data creazione:
 * E-mail: vaulttech.swe@gmail.com
 *
 *  Direttiva per la creazione di domanda a tipo risposta aperta
 *
 * * Diario delle modifiche:
 *
 */

angular.module('CreateQuestion').directive('createQopen',function(){
    
    return {
      restrict: 'E',
      templateUrl: './public/question_creation/createQOpen.html'
    };
    
});