angular.module('Quizzipedia').controller('CtrlHeader',['$scope','$http',function($scope,$http){    
    
    $scope.user = null;
    $scope.currentHeader = null; 
    
    $scope.loadUser = function() {
      //assegno l'oggetto utente ricevuto dal server a $scope.user  
        $http.get('/api/profile/get_full_info_user').success(function(response){
            $scope.user = response;
            
            })        
    
    };
    /*}).error(function(response){
            alert("Errore");
        });
        
    }; */     
    
   $scope.loadUser();    
   
    
}]);