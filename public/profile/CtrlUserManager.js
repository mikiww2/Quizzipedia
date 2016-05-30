angular.module('ProfileManager').controller('CtrlUserManager',['$scope','$http',function($scope,$http){
    
    $scope.user = null;
    $scope.institutions = { 'Ancora in nessun ente' : 'Nessun ruolo assegnato' };
    $scope.oldPsw = null;
    $scope.newPsw = null;
    $scope.cNewPsw = null;
    $scope.recovering = false;  //indica se è un cambio pswd normale o un recuperoPswd
    $scope.emptystring = "";  //necessaria in caso cambio pswd normale
    
    $scope.loadUser = function() {
      //assegno l'oggetto utente ricevuto dal server a $scope.user  
        $http.get('/api/profile/get_full_info_user').success(function(response){
            $scope.user = response;
            if(response.tmpPassword)  //nel caso ci si trovi nella pagina recuperoPswd
            $scope.recovering = true; 
        })
        .error(function(response){
            $window.location.href = '/Quizzipedia/home.html';
            alert("Sessione scaduta");
        });        
    };
    
    $scope.loadInstitutions = function() {//chiediamo al server un oggetto contenente le affiliazioni dell'utente
        $http.get('/api/institution/fetch_user_inst').success(function(response) {
            $scope.institutions = repsponse;
        })        
   };
    
   $scope.changePsw = function(){
        
        $scope.tmp_pswd = null;
        
        $http.get('/api/profile/get_pswd').success(function(response){
            $scope.user = response;
            $scope.recovering = false;
        });
        
        
    };
    
    $scope.loadUser();    
    $scope.loadInstitutions();    
    
    
}]);