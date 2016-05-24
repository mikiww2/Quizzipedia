angular.module().controller('CtrlSearchQuiz',['Topics','User', 'Quiz','$scope','$http',function(Topics, User, Quiz, $scope, $http){
    
    $scope.MySearchQuiz = {
      
        title: null,
        author: null,
        selectedTopic: null,
        selectedKeywords: [],
        difficulty: null,
        permission: null,        
    };
    
    $scope.topics = null; //carico l'array facendo una chiamata al server
    $scope.keywords = [];//carico l'array facendo una chiama al server
    $scope.user = null; //carico l'utente leggendo la sessione nel server
    $scope.quizList = null; //aggiorno questo oggetto con il metodo searchQuiz
    
    
    $scope.loadUser = function(){
      //creo l'oggetto utente loggato in questo momento  
    };
    
    $scope.loadKeywords = function(){
        //leggo tutte le keywords di ogni quiz dal server
    };
    
    $scope.loadTopics = function(){
        //carico i topics leggendoli dal server
    };
    
    $scope.searchQuiz = function(search: MySearchQuiz){
        
        //passo al server tutti i dati necessari per avviare la ricerca
        //infine faccio $scope.quizList = Quiz[]       
    };   
   
    
}]);