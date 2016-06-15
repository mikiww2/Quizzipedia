/*
 * Nome del file: CtrlQuestionManager.js
 * Percorso: public/question_creation/CtrlQuestionManager.js
 * Autore: Vault-Tech
 * Data creazione:
 * E-mail: vaulttech.swe@gmail.com
 *
 *  Controller per la gestione delle domande
 *
 * * Diario delle modifiche:
 *
 */

angular.module('QuestionManager').controller('CtrlQuestionManager',['$scope','$http','TrueFalseQ',function($scope,$http,TrueFalseQ){
    //Mancano queste dipendenze 'MatchingQ','MultipleChoiceQ','ShortAnswerQ','TrueFalseQ','CompletionQ','Teacher'
    
    $scope.teacher = null; //Teacher
    $scope.Questionlist = [];
    
    $scope.modifyQuestion = null;
    $scope.deleteQuestion = null; //indice della domanda da eliminare
    $scope.typeQuestion = "";       
    
    $scope.loadQuestionList = function(){
        //chiedo al server di inviarmi tutte le domande create dal teacher loggato
        $http.get('/api/question/fetch_teacher_questions').success(function(response){
            $scope.Questionlist = response; 
            
            angular.forEach ($scope.Questionlist, function(question) {
                if (question.difficulty == 1)
                    question.difficulty = "Facile";
                else if (question.difficulty == 2)
                    question.difficulty = "Medio";
                else if (question.difficulty == 3)
                    question.difficulty = "Difficile";
                else if (question.difficulty == 4)
                    question.difficulty = "Molto difficile";
                
                if (question.type == "trfs")
                     question.type = "Risposta vero/falso";
                 else if (question.type == "mult")
                     question.type = "Risposta multipla";
                 else if (question.type == "open")
                     question.type = "Risposta aperta";
                 else if (question.type == "cmpl")
                     question.type = "Risposta a completamento";
                 else if (question.type == "mtch")
                     question.type = "Risposta a collegamenti";
            });
        });
    };
    
    $scope.loadTeacher = function(){
      //chiedo al server di inviarmi i dati per creare un utente Teacher  
    };
    
    $scope.setDeleteQ = function(index) {
        $scope.deleteQuestion = index;        
    };
    
    $scope.removeQuestion = function(){ //int
        //rimuovo la domanda localmente e invio una richiesta al server per eliminare definitivamente la domanda
        //var id = $scope.Questionlist[indexOfQuestion]._id;
        
       $http.post('/api/question/erase', $scope.Questionlist[$scope.deleteQuestion]).success(function(response){
            $scope.Questionlist.splice($scope.deleteQuestion, 1);
           $scope.deleteQuestion = null;
       }).error(function() {
           alert("Errore nell'eliminazione");
       });       
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
    
    $scope.loadQuestionList();    
}]);