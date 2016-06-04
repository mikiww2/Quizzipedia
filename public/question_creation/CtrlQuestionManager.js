angular.module('QuestionManager').controller('CtrlQuestionManager',['$scope','$http','TrueFalseQ',function($scope,$http,TrueFalseQ){
    //Mancano queste dipendenze 'MatchingQ','MultipleChoiceQ','ShortAnswerQ','TrueFalseQ','CompletionQ','Teacher'
    
    $scope.teacher = null; //Teacher
    $scope.Questionlist = [];
    
    $scope.modifyQuestion = null;
    $scope.typeQuestion = "";
    
        
    
    $scope.loadQuestionList = function(){
        //chiedo al server di inviarmi tutte le domande create dal teacher loggato
        $http.get('/api/question/fetch').success(function(response){
            $scope.Questionlist = response;
            
            
        });
    };
    
    $scope.loadTeacher = function(){
      //chiedo al server di inviarmi i dati per creare un utente Teacher  
    };
    
    $scope.removeQuestion = function(indexOfQuestion){ //int
        //rimuovo la domanda localmente e invio una richiesta al server per eliminare definitivamente la domanda
        var id = $scope.Questionlist[indexOfQuestion]._id;
        
        /*$http.post('',id).success(function(response){
            $scope.Questionlist.splice(indexOfQuestion,1);    
        });*/
        
        
    };
    
    $scope.setModifyQuestion = function(question){ //GenericQuestion
        //$scope.modifyQuestion = question;
        
        var tmp = new TrueFalseQ();
        
        tmp.setAuthor(question.author);
        tmp.setTitle(question.title);
        tmp.setDescription(question.description);
        tmp.setTopic(question.topic);
        tmp.setDifficulty(question.difficulty.toString());
        tmp.setQuestionAttachment(question.questionAttachment);
        tmp.setKeyword(question.keywords);
        tmp.setCorrectAnswer(question.correctAnswer);
        
        $scope.modifyQuestion = tmp;
        $scope.typeQuestion = 'trfs';
        
        
    };
    
    $scope.checkTypeModifyQuestion = function(type){
       //ritorna true o false
    };
    
    $scope.save = function(){
        //chiedere al server di salvare tutto
        $http.post('/api/question/save',$scope.modifyQuestion).success(function(response){
            alert("Domanda salvata");
            $scope.modifyQuestion = null;
            $scope.loadQuestionList();
        });
    };
    
    
}]);