angular.module().controller('CtrlHeader',['$scope','$http','NoRole','Director','Student','Teacher',function($scope,$http,NoRole,Director,Student,Teacher){
    
    
    $scope.user = null;
    $scope.loadUser = function(){
      //assegno l'oggetto utente ricevuto dal server a $scope.user  
    };
    
    $scope.currentHeader = "header_notLogged";
    $scope.loadCurrentHeader = function(){ //per includere la pagina si arrangia la view noi le diciamo che file deve prendere e lo chiediamo al server
      if($scope.user instanceof NoRole){
          $scope.currentHeader = "header_logged";
      }else if($scope.user instanceof Director){
          $scope.currentHeader = "header_loggedDirector";
      }else if($scope.user instanceof Student){
          $scope.currentHeader = "header_loggedStudent";
      }else if($scope.user instanceof Teacher){
          $scope.currentHeader = "header_loggedTeacher";
      }else{
          $scope.currentHeader = "header_notLogged"
      }
    };
    
    
}]);