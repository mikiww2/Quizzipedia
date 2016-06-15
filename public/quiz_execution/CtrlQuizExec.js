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
    
    $scope.currentQuestion = -1;
    $scope.quiz = null;
    $scope.answerQuiz = new AnswerQuiz(null);
    $scope.results = []; //bool
    
    
    
    $scope.loadQuiz = function(){
        //fare get
        $http.get('/api/quiz/fetch_quiz_to_execute').success(function(response){
            $scope.quiz = response;
            console.log($scope.quiz);
        });
        
    };
    
    
    
    $scope.loadQuizQuestions = function(){
        //fa la get e creiamo gli answer dentro answerQuiz
        $http.get('/api/question/fetch_quiz_questions').success(function(response){
                        
            //setto i parametri di answerQuiz
            $scope.answerQuiz.setIdQuiz($scope.quiz._id);
            
            //popolare l'array answerQuestion dentro a answerQuiz
            console.log(response);
            
            var size = response.length;
            
            for(var i = 0; i < size; i++){
                
                var answer = null;
                
                if(response[i].type == 'trfs'){ //ok
                    answer = new AnswerTrueFalseQ(response[i],null);
                    console.log(answer);
                }
                else if(response[i].type == 'open'){ //ok
                    answer = new AnswerShortAnswerQ(response[i],"");
                    console.log(answer);
                }
                else if(response[i].type == 'mult'){//ok
                    answer = new AnswerMultipleChoiceQ(response[i]);
                    for(var j = 0; j < answer.question.details.arrayAnswer.length;j++){
                        answer.addAnswer(false);    
                    }
                    
                    console.log(answer);
                }
                else if(response[i].type == 'mtch'){ //ok
                    answer = new AnswerMatchingQ(response[i]);
                    
                    var array = answer.question.details.answer;
                    
                    
                    for(var j = 0; j < array.length; j++){
                        var element = new AnswerMatchingQElement();
                        
                        element.setId(-1);
                        if(array[j].attachment != null){
                            element.valueAnswer = array[j].attachment.path;
                        }
                        else if (array[j].txt != null){
                            element.valueAnswer = array[j].txt;
                        }
                        
                        answer.addAnswer(element);
                    }
                    console.log(answer);
                    
                }
                else if(response[i].type == 'cmpl'){//ok
                    answer = new AnswerCompletionQ(response[i]);
                    
                    var array = answer.question.details.text;
                    
                    for(var k = 0; k < array.length; k++){
                        if(array[k].type == 'id'){
                            answer.addAnswer("");
                        }
                    }
                    
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
        console.log("SAVEQUIZ");
        
        
        for(var i = 0; i < $scope.answerQuiz.answerQuestion.length; i++){
            
            if($scope.answerQuiz.answerQuestion[i].question.type == 'trfs'){
                
                $scope.answerQuiz.answerQuestion[i].isCorrect = $scope.answerQuiz.answerQuestion[i].checkTF(); 
            }
            else if($scope.answerQuiz.answerQuestion[i].question.type == 'mtch'){
                $scope.answerQuiz.answerQuestion[i].isCorrect = $scope.answerQuiz.answerQuestion[i].checkMatching();
            }
            else if($scope.answerQuiz.answerQuestion[i].question.type == 'open'){
                $scope.answerQuiz.answerQuestion[i].isCorrect = $scope.answerQuiz.answerQuestion[i].checkShortAns();
            }
            else if($scope.answerQuiz.answerQuestion[i].question.type == 'mult'){
                $scope.answerQuiz.answerQuestion[i].isCorrect = $scope.answerQuiz.answerQuestion[i].checkMultiple();
            }
           
        }
        
        console.log($scope.answerQuiz.answerQuestion);
        
        //salvo il quiz localmente dentro a $sope.user e poi invio la richesta al server
    };
    
    $scope.loadQuiz();
    $scope.loadQuizQuestions();
    
}]);