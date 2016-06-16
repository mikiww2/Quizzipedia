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
    
    $scope.currentPage = -1;
    $scope.quiz = null;
    $scope.answerQuiz = new AnswerQuiz(null);
    $scope.results = []; //bool
    
    $scope.getIframeSrc = function (videoId) {
    return videoId;
    };
    
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
                
                if(response[i].type == 'trfs'){ //ok
                    answer = new AnswerTrueFalseQ(response[i],null);
                }
                else if(response[i].type == 'open'){ //ok
                    answer = new AnswerShortAnswerQ(response[i],"");
                }
                else if(response[i].type == 'mult'){//ok
                    answer = new AnswerMultipleChoiceQ(response[i]);
                    for(var j = 0; j < answer.question.details.arrayAnswer.length;j++){
                        answer.addAnswer(false);    
                    }
         
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
                    
                }
                else if(response[i].type == 'cmpl'){//ok
                    answer = new AnswerCompletionQ(response[i]);
                    
                    var array = answer.question.details.text;
    
                    for(var k = 0; k < array.length; k++){
                        if(array[k].type == 'id'){
                            answer.addAnswer("");
                        }
                        else if(array[k].type == 'txt'){
                            answer.addAnswer(array[k].value);
                        }
                            
                    }
                }
                
                $scope.answerQuiz.addAnswer(answer);
            }            
            
        });
    };
    
    
    $scope.changeCurrentPage = function(number){ //number = -1 o +1
        $scope.currentPage = $scope.currentPage + number;  
    };   
    
    $scope.success = function(){
        
        var size = $scope.answerQuiz.answerQuestion.length;
        var correct = $scope.punteggio;
        
        var percentuale = (correct * 100) / size;
        if(percentuale >= 60){
            return true;
        }
        else {
            return false;
        }
    };
    
    
    $scope.saveQuiz = function(){
        $scope.punteggio = 0;
        
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
            else if($scope.answerQuiz.answerQuestion[i].question.type == 'cmpl'){
                $scope.answerQuiz.answerQuestion[i].isCorrect = $scope.answerQuiz.answerQuestion[i].checkCompletion();
            }
            
            if($scope.answerQuiz.answerQuestion[i].isCorrect){
                    $scope.punteggio = $scope.punteggio + 1;
            }
           
        }
        
        
        //devo inviare al server il answerQuiz
        
        var voto = $scope.punteggio + "/" + $scope.answerQuiz.answerQuestion.length; 
        
        
         var size = $scope.answerQuiz.answerQuestion.length;
        var correct = $scope.punteggio;
        
        var percentuale = (correct * 100) / size;
        
        var json = {
            quiz: $scope.answerQuiz,
            voto: voto,
            percentuale: percentuale,
            
        };
        
        $http.post('/api/quiz/save_results',json);
        
        $scope.currentPage = -2;
        
        //salvo il quiz localmente dentro a $sope.user e poi invio la richesta al server
    };
    
    $scope.loadQuiz();
    $scope.loadQuizQuestions();

    
    
}]).filter('trusted', ['$sce', function ($sce) {
    return function(url) {
        return $sce.trustAsResourceUrl(url);
    };
}]);
