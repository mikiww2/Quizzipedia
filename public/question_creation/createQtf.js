/*
 * Nome del file: createQtf.js
 * Percorso: public/question_creation/createQtf.js
 * Autore: Vault-Tech
 * Data creazione:
 * E-mail: vaulttech.swe@gmail.com
 *
 *  Direttiva per la creazione di domanda vero o falso
 *
 * * Diario delle modifiche:
 *
 */

angular.module('CreateQuestion').directive('createQtf',function(){
    
    return {
      restrict: 'E',
      templateUrl: './public/question_creation/createQTF.html'
    };
    
});