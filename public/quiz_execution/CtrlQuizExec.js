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

angular.module('QuizSolver').controller('CtrlExecutionQuiz',['$scope','$http','AnswerQuiz','AnswerQuestion','AnswerTrueFalseQ','AnswerCompletionQ','AnswerShortAnswerQ','AnswerMatchingQ','AnswerMultipleChoiceQ','AnswerMatchingQElement',function($scope,$http,AnswerQuiz,AnswerQuestion,AnswerTrueFalseQ,AnswerCompletionQ,AnswerShortAnswerQ,AnswerMatchingQ,AnswerMultipleChoiceQ,AnswerMatchingQElement){
    
    
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
                
                var answer = null;
                
                if(response[i].type == 'trfs'){
                    answer = new AnswerTrueFalseQ(response[i],null);
                    console.log(answer);
                }
                else if(response[i].type == 'open'){
                    answer = new AnswerShortAnswerQ(response[i],null);
                    console.log(answer);
                }
                else if(response[i].type == 'mult'){
                    answer = new AnswerMultipleChoiceQ(response[i]);
                    console.log(answer);
                }
                else if(response[i].type == 'mtch'){
                    answer = new AnswerMatchingQ(response[i]);
                    console.log(answer);
                }
                else if(response[i].type == 'cmpl'){
                    answer = new AnswerCompletionQ(response[i]);
                    console.log(answer);
                }
                
                $scope.answerQuiz.addAnswer(answer);
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