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
    
    
    $scope.currentQuestion = 0;
    $scope.quiz = null;
    $scope.quizQuestions = [];
    $scope.answerQuiz = null; //new AnswerQuiz();
    $scope.results = []; //bool
    
    
    
    $scope.loadQuiz = function(){
        //fare get
        
    };
    
    
    
    $scope.loadQuizQuestions = function(){
        //fa la get e creiamo gli answer dentro answerQuiz
    };
    
    
    $scope.changeCurrentQuestion = function(number){ //number = -1 o +1
        $scope.currentQuestion = $scope.currentQuestion + number;  
    };
    
    $scope.saveQuiz = function(){
        
        //salvo il quiz localmente dentro a $sope.user e poi invio la richesta al server
    };
    
    
    
}]);