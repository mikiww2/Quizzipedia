angular.module('QuizSolver').controller('CtrlExecutionQuiz',[function(){
    
    
    $scope.indexQuestion = 0;
    $scope.question = null; //GenericQuestion
    $scope.answerQuiz = new AnswerQuiz();
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