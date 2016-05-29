angular.module('QuestionManager').controller('CtrlQuestionManager',['$scope','$http',function($scope,$http){
    //Mancano queste dipendenze 'MatchingQ','MultipleChoiceQ','ShortAnswerQ','TrueFalseQ','CompletionQ','Teacher'
    
    $scope.teacher = null; //Teacher
    $scope.Questionlist =[{ "author": "teacher@gmail.com", "title": "AAAAAAAAAAA", "description": "descrizione domanda", "topic": "Informatica", "difficulty": "Facile", "questionAttachement": null, "keywords": [ "B" ], "correctAnswer": "true" }, { "author": "teacher@gmail.com", "title": "BBBBBBBBBB", "description": "descrizione domanda", "topic": null, "difficulty": "Media", "questionAttachement": null, "keywords": [], "correctAnswer": "booooooh" }];
    
    
    
    
    
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