angular.module('Quizzipedia').controller('CtrlHeader',['$scope','$http',function($scope,$http){    
    
    $scope.user = null;
    $scope.institutions = { 'Ancora in nessun ente' : 'Nessun ruolo assegnato' };
    $scope.noInstitution = "Nessun ente selezionato";
    $scope.currentHeader = null; 
    
    $scope.loadUser = function() {
      //assegno l'oggetto utente ricevuto dal server a $scope.user  
        $http.get('/api/profile/get_full_info_user').success(function(response){
            $scope.user = response;  
            })    
    };
    
    $scope.loadInstitutions = function() {//chiediamo al server un oggetto contenente le affiliazioni dell'utente
        $http.get('/api/institution/fetch_user_inst').success(function(response) {
            $scope.institutions = response;
        })        
   };
    
    $scope.changeInst = function(orgName){
      console.log(orgName);
      var name = { organizationName : orgName};
        $http.post('/api/institution/change_inst', name);       
        
        /*.success(function(response) {
            $route.reload();
        })    */    
   };
    
   $scope.loadUser();
   $scope.loadInstitutions();
   
    
}]);