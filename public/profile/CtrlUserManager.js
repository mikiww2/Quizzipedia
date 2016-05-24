angular.module('profilemanager',[]).controller('CtrlUserManager',['$scope','$http',function($scope,$http){
    
    $scope.user = {};
    
    $scope.oldPsw = null;
    $scope.newPsw = null;
    $scope.cNewPsw = null;
    $scope.recovering = false;  //indica se è un cambio pswd normale o un recuperoPswd
    $scope.emptystring = "";  //necessaria in caso cambio pswd normale

    $http.get('/api/profile/get_user').success(function(response){
        $scope.user = response;
        if(response.tmpPassword)  //nel caso ci si trovi nella pagina recuperoPswd
            $scope.recovering = true;
    });
    
    $scope.changePsw = function(){
        
        $scope.tmp_pswd = null;

    $http.get('/api/profile/get_pswd').success(function(response){
        $scope.user = response;
        $scope.recovering = false;
    });
        
        
    };
    
    $scope.loadUser = function(){
        //facciamo una richiesta al server, che ci restituirà l'oggetto utente e successivamente costruiamo l'oggetto utente assegnadolo a $scope.user
        
        
    };
    
    $scope.loadAffiliations = function(){
        //chiediamo al server un oggetto contenente le affiliazioni dell'utente  
    };    
    
    
}]);