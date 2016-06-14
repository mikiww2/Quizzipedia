/*
 * Nome del file: CtrlSearchQuestion.js
 * Percorso: public/CtrlSearchQuestion.js
 * Autore: Vault-Tech
 * Data creazione:
 * E-mail: vaulttech.swe@gmail.com
 *
 *  Controller che gestisce le ricerche delle domande
 *
 * * Diario delle modifiche:
 *
 */

angular.module().controller('CtrlSearchQuestion',['Topics','Teacher','$scope','$http','CompletionQ','MatchingQ','MultipleChoiceQ','ShortAnswerQ','TrueFlaseQ',function(Topics,Teacher,$scope,$http){
    
    $scope.mySearchQuestion = {
      
        title: null,
        author: null,
        selectedTopic: null,
        selectedKeywords: [],
        difficulty: null,
        
    };
    
    $scope.topics = null; //carico l'array facendo una chiamata al server
    $scope.keywords = [];//carico l'array facendo una chiama al server
    $scope.teacher = null; //carico l'utente leggendo la sessione nel server
    $scope.QuestionList = null; //aggiorno questo oggetto con il metodo searchQuiz
    
    
    $scope.loadTeacher = function(){
      //creo l'oggetto utente loggato in questo momento  
    };
    
    $scope.loadKeywords = function(){
        //leggo tutte le keywords di ogni quiz dal server
    };
    
    $scope.loadTopics = function(){
        //carico i topics leggendoli dal server
    };
    
    $scope.searchQuestions = function(mySearchQuestion){
        
        //passo al server tutti i dati necessari per avviare la ricerca
        //infine faccio $scope.listQuestions = GenericQuestion[]
        
    };
    
    
    
}]);