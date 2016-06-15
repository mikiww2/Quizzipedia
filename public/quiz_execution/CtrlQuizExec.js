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

angular.module('QuizSolver').controller('CtrlExecutionQuiz',['$scope','$http','AnswerQuiz','AnswerQuestion','AnswerTrueFalseQ','AnswerCompletionQ','AnswerShortAnswerQ','AnswerMatchingQ','AnswerMultipleChoiceQ',function($scope,$http,AnswerQuiz,AnswerQuestion,AnswerTrueFalseQ,AnswerCompletionQ,ANswerShortAnswerQ,AnswerMatchingQ,AnswerMultipleChoiceQ){
    
    
    $scope.currentQuestion = 0;
    $scope.quiz = null;
    //$scope.quizQuestions = null;
    $scope.answerQuiz = new AnswerQuiz(null);
    $scope.results = []; //bool
    
    
    
    $scope.loadQuiz = function(){
        //fare get
        $http.get('/api/quiz/fetch_quiz_to_execute').success(function(response){
            $scope.quiz = response;
        });
        
    };
    
    
    
    $scope.loadQuizQuestions = function(){
        //fa la get e creiamo gli answer dentro answerQuiz
        $http.get('/api/question/fetch_quiz_questions').success(function(response){
            
            
            //setto i parametri di answerQuiz
            $scope.answerQuiz.setIdQuiz($scope.quiz._id);
            
            //popolare l'array answerQuestion dentro a answerQuiz
            
            var size = response.length;
            
            for(var i = 0; i < size; i++){
                
            }
            
            
        });
    };
    
    
    $scope.changeCurrentQuestion = function(number){ //number = -1 o +1
        $scope.currentQuestion = $scope.currentQuestion + number;  
    };
    
    $scope.saveQuiz = function(){
        
        //salvo il quiz localmente dentro a $sope.user e poi invio la richesta al server
    };
    
    $scope.loadQuiz();
    $scope.loadQuizQuestions();
    
}]);