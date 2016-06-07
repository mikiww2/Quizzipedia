angular.module('RequestsManager').controller ('CtrlPendingRR',['$scope', '$http','$window', function($scope, $http, $window){
    
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
            
    $scope.acceptRoleRequest = function (email) {
        var value = { email: email};
        $http.post('/api/requests/accept_role_request', value)
                .success(function(response){
                    $window.location.href = '/Quizzipedia/viewPendingRequests';
                }).error(function(response){
                    alert("Errore");
                });
    };
    
    $scope.discardRoleRequest = function (email) {
        var value = { email: email};
        $http.post('/api/requests/discard_role_request', value)
                .success(function(response){
                    $window.location.href = '/Quizzipedia/viewPendingRequests';
                }).error(function(response){
                    alert("Errore");
                });
    };
    
    //$scope.loadUser();
    $scope.loadPendingRR();

}]);