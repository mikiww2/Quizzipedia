/*
 * Nome del file: CtrlTopics.js
 * Percorso: public/topics/CtrlTopics.js
 * Autore: Vault-Tech
 * Data creazione:
 * E-mail: vaulttech.swe@gmail.com
 *
 *  Controller per la gestione degli argomenti
 *
 * * Diario delle modifiche:
 *
 */

angular.module('TopicsManager').controller('CtrlTopics',['Topics','$scope','$http','$window',function(Topics,$scope,$http,$window){
    
    
     $scope.loadTopics = function(){
         $http.get('/api/topic/fetch').success(function(response){
             
             var topics = new Topics();
             for(var i =0; i< response.length; i++){
                 topics.addTopic(response[i]);
             }
             $scope.topicsList = topics;        
       });
      
        //faccio una richiesta al server che mi ritorna un array di topics e assegno l'oggetto a listTopics
    };

    
    
    
    $scope.topicsList = $scope.loadTopics();
    
    $scope.eraseTopic = null; //index topic
    
    $scope.topicName = null; //variabile che si ricorda il nome del topic inserito nella form
    
   
    
     $scope.addTopic = function(name){
         //inseriamo il nuovo topic dentro a listTopics e invio una richiesta al server
         var value = {topicName: name};
         

         //$scope.topicsList.addTopic(name);

         $http.post('/api/topic/save', value)
                .success(function(response){
                    //$window.location.href = '/Quizzipedia/topicMgmt';
                    //res_code res_msg
             
                    $scope.topicName = null;
             
                    switch(response.res_code){
                        case 0: alert(response.res_msg); break;
                        case 1: $scope.topicsList.addTopic(value); break;
                        default: $window.location.href= response.res_msg;
                    }
             
             
                }).error(function(response){
                    alert("Errore");
                });

     };
    
     $scope.removeTopic = function(index){
         //rimuovo il topic in locale e invio una richiesta al serve

         
         var value = { topicName: $scope.topicsList.topics[index].topicName};
         

         //$scope.topicsList.addTopic(name);

         $http.post('/api/topic/erase', value)
                .success(function(response){
             
                    //$window.location.href = '/Quizzipedia/topicMgmt';
             
                    $scope.topicName = null;
             
                    switch(response.res_code){
                        case 0: alert(response.res_msg); break;
                        case 1: $scope.topicsList.removeTopic(index); break;
                        default: $window.location.href= response.res_msg; break;
                    }
             
                }).error(function(response){
                    alert("Errore");
                });
         
         
     };
    
    
    $scope.setEraseTopic = function(index){
      $scope.eraseTopic = index;  
    };
    
}]);