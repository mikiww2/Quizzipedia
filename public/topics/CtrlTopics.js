angular.module('TopicsManager').controller('CtrlTopics',['Topics','$scope','$http','$window',function(Topics,$scope,$http,$window){
    
    
     $scope.loadTopics = function(){
        
       $http.get('/api/topic/fetch').success(function(response){
           
           //var topics = new Topics();
           console.log(response);
           
           return null;
           
           
       });
      
        //faccio una richiesta al server che mi ritorna un array di topics e assegno l'oggetto a listTopics
    };

    
    
    
    $scope.topicsList = $scope.loadTopics();
    
    $scope.eraseTopic = null; //index topic
    
    $scope.topicName = null; //variabile che si ricorda il nome del topic inserito nella form
    
   
    
     $scope.addTopic = function(name){
         //inseriamo il nuovo topic dentro a listTopics e invio una richiesta al server
         var value = { topicName: name};
         

         //$scope.topicsList.addTopic(name);

         $http.post('/api/topic/save',value)
                .success(function(response){
                    $window.location.href = '/Quizzipedia/topicMgmt';
                }).error(function(response){
                    alert("Errore");
                });

     };
    
     $scope.removeTopic = function(index){
         //rimuovo il topic in locale e invio una richiesta al serve
         
         $scope.topicsList.removeTopic(index);
         
         
     };
    
    
    $scope.setEraseTopic = function(index){
      $scope.eraseTopic = index;  
    };
    
}]);