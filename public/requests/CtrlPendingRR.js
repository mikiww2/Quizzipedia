angular.module('RequestsManager').controller ('CtrlPendingRR',['$scope', '$http', function($scope, $http){
    
    //$scope.user = null;
    $scope.institution = "Nessun ente selezionato";
    $scope.pendingRR = null;
    $scope.request = null;
    
    /*$scope.loadUser = function() {
        //assegno l'oggetto utente ricevuto dal server a $scope.user  
        $http.get('/api/profile/get_full_info_user').success(function(response){
            $scope.user = response;
        })
            .error(function(response){
            $window.location.href = '/Quizzipedia/home';
            alert("Sessione scaduta");
        });
    };*/
    
    $scope.loadPendingRR = function () {
        $http.get('/api/requests/view_role_requests').success(function(response) {
            $scope.pendingRR = response;
        });
    };  
            
    $scope.acceptRoleRequest = function () {
        //invia al server la richiesta che si intende accettare
    };
    
    $scope.discardRoleRequest = function () {
        //invia al server l richiesta che si intende rifiutare
    };
    
    //$scope.loadUser();
    $scope.loadPendingRR();

}]);