/*
 * Nome del file: directiveModify.js
 * Percorso: public/question_creation/directiveModify.js
 * Autore: Vault-Tech
 * Data creazione:
 * E-mail: vaulttech.swe@gmail.com
 *
 *  Controller per le direttive dei vari tipi di domanda
 *
 * * Diario delle modifiche:
 *
 */

angular.module('QuestionManager').directive('modifyQtf',function(){
    
    return {
      restrict: 'E',
        templateUrl: './public/question_creation/modifyQTF.html'
    };
    
});

angular.module('QuestionManager').directive('modifyQmatch',function(){
    
    return {
        restrict: 'E',
        templateUrl: './public/question_creation/modifyQMatch.html'
    };
    
});

angular.module('QuestionManager').directive('modifyQopen',function(){
    
    return {
        restrict: 'E',
        templateUrl: './public/question_creation/modifyQOpen.html'
    };
    
});

angular.module('QuestionManager').directive('modifyQcompletion',function(){
    
    return {
      restrict: 'E',
        templateUrl: './public/question_creation/modifyQCompletion.html'
    };
    
});

angular.module('QuestionManager').directive('modifyQmultiple',function(){

    return {
       restrict: 'E',
        templateUrl: './public/question_creation/modifyQMultiple.html'
    };

});