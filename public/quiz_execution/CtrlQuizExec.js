/*
 * Nome del file: CtrlQuizExec.js
 * Percorso: public/quiz_execution/CtrlQuizExec.js
 * Autore: Vault-Tech
 * Data creazione:
 * E-mail: vaulttech.swe@gmail.com
 *
 *  Controller per la gestione dell'esecuzione quiz
 *
 * * Diario delle modifiche:
 *
 */

angular.module('QuizSolver').controller('CtrlExecutionQuiz',['$scope',function($scope){
    
    
    $scope.indexQuestion = 0;
    $scope.question = null; //GenericQuestion
    $scope.answerQuiz = null; //new AnswerQuiz();
    $scope.answer = null;
    $scope.loadQuestion = function(indexQuestion){
        //localmente recupero la domanda in posizione indexQuestion e la assegno a $scope.question.
        //successivamente verifico in $scope.answerQuiz se esiste già una risposta in answerQuiz. Se si carico quella altrimenti ne creo una vuota e la si assegna a $scope.answer
    };
    
    $scope.saveAnswer = function(){
      //inserisce $scope.asnwer in $scope.answerQuiz nella posizione corretta  
    };
    
    $scope.saveQuiz = function(){
        
        //salvo il quiz localmente dentro a $sope.user e poi invio la richesta al server
    };
    
    
    
}]);