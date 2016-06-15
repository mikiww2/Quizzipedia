/*
 * Nome del file: createQCompletation.js
 * Percorso: public/question_creation/createQCompletation.js
 * Autore: Vault-Tech
 * Data creazione:
 * E-mail: vaulttech.swe@gmail.com
 *
 *  Direttiva per la creazione di domanda a completamento
 *
 * * Diario delle modifiche:
 *
 */

angular.module('CreateQuestion').directive('createQcompletion',function(){
    
    return {
      restrict: 'E',
      templateUrl: './public/question_creation/createQCompletion.html'
    };
    
    
});