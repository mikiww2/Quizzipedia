/*
 * Nome del file: searchQuestions.js
 * Percorso: public/quiz_creation/searchQuestions.js
 * Autore: Vault-Tech
 * Data creazione:
 * E-mail: vaulttech.swe@gmail.com
 *
 *  Controller per la ricerca di domande
 *
 * * Diario delle modifiche:
 *
 */

angular.module('QuizManager').directive ('searchQuestions',[function(){
    
    return {
        restrict: 'E',
        templateUrl: './public/quiz_creation/search_questions.html'
    };
}]);