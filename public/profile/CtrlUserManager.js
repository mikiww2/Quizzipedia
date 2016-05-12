angular.module().controller('CtrlUserManager',['NoRole','Student','Teacher','Director','$scope','$http',function(NoRole,Student,Teacher,Director,$scope,$http){
    
    $scope.user = {};
    
    $scope.oldPsw = null;
    $scope.newPsw = null;
    $scope.cNewPsw = null;        
    
    $scope.changePsw = function(){
        
        /*
        Se la oldPsw è corretta allora invio al server una richiesta di 
        cambio password passando al server la nuova psw e la mail dell'utente
        */
        
        
    };
    
    $scope.loadUser = function(){
        //facciamo una richiesta al server, che ci restituirà l'oggetto utente e successivamente costruiamo l'oggetto utente assegnadolo a $scope.user
        
        
    };
    
    $scope.loadAffiliations = function(){
        //chiediamo al server un oggetto contenente le affiliazioni dell'utente  
    };    
    
    
}]);