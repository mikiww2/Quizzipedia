angular.module().controller('CtrlQuestionManager',['MatchingQ','MultipleChoiceQ','ShortAnswerQ','TrueFalseQ','CompletionQ','Teacher','$scope','$http',function(MatchingQ,MultipleChoiceQ,ShortAnswerQ,TrueFlaseQ,CompletionQ,Teacher,$scope,$http){
    
    $scope.teacher = null; //Teacher
    $scope.Questionlist =[];
    $scope.loadQuestionList = function(){
        //chiedo al server di inviarmi tutte le domande create dal teacher loggato
        
    };
    
    $scope.loadTeacher = function(){
      //chiedo al server di inviarmi i dati per creare un utente Teacher  
    };
    
    $scope.removeQuestion = function(indexOfQuestion){ //int
        //rimuovo la domanda localmente e invio una richiesta al server per eliminare definitivamente la domanda
    };
    
    $scope.modifyQuestion = function(question){ //GenericQuestion
        
    };
    
    
    
}]);