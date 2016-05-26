angular.module('Quizzipedia').controller('CtrlHeader',['$scope','$http',function($scope,$http){
    
    
    $scope.user = null;
    $scope.loadUser = function(){
      //assegno l'oggetto utente ricevuto dal server a $scope.user  
    };
    
    $scope.currentHeader = "notLogged";
    $scope.index = 0;
    $scope.loadCurrentHeader = function(i){ //per includere la pagina si arrangia la view noi le diciamo che file deve prendere e lo chiediamo al server
      /*if($scope.user instanceof NoRole){
          $scope.currentHeader = "logged";
      }else if($scope.user instanceof Director){
          $scope.currentHeader = "loggedDirector";
      }else if($scope.user instanceof Student){
          $scope.currentHeader = "loggedStudent";
      }else if($scope.user instanceof Teacher){
          $scope.currentHeader = "loggedTeacher";
      }else{
          $scope.currentHeader = "notLogged"
      }*/
        $scope.index = $scope.index + 1;
        i= $scope.index;
       if(i == 1){
          $scope.currentHeader = "logged";
      }else if(i == 4){
          $scope.currentHeader = "loggedDirector";
      }else if(i == 2){
          $scope.currentHeader = "loggedStudent";
      }else if(i == 3){
          $scope.currentHeader = "loggedTeacher";
      }else{
          $scope.currentHeader = "notLogged";
          $scope.index = 0;
      } 
        
        
    };
    
    
}]);