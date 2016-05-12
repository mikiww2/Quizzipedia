angular.module().controller('CtrlTopics',['Topics','$scope','$http',function(Topics,$scope,$http){
    
    $scope.topicsList = [];
    
    $scope.topicName = null; //variabile che si ricorda il nome del topic inserito nella form
    
    $scope.loadTopics = function(){
      
        //faccio una richiesta al server che mi ritorna un array di topics e assegno l'oggetto a listTopics
    };
    
     $scope.addTopic = function(name){
         
         //inseriamo il nuovo topic dentro a listTopics e invio una richiesta al server
     };
    
     $scope.removeTopic = function(indexOfTopic){
         //rimuovo il topic in locale e invio una richiesta al serve
     };
    
}]);