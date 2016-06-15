/*
 * Nome del file: pendingRole.js
 * Percorso: public/requests/pendingRole.js
 * Autore: Vault-Tech
 * Data creazione:
 * E-mail: vaulttech.swe@gmail.com
 *
 *  Controller per la gestione di richieste pendenti di ruolo
 *
 * * Diario delle modifiche:
 *
 */

angular.module('RequestsManager').directive ('pendingRole',['$window', function($window){
    
    return {
        restrict: 'E',
        templateUrl: './public/requests/pending_role.html',
        controller: function ($scope, $http) {
            
            $scope.pendingRR = null;
            
            $scope.loadPendingRR = function () {
                $http.get('/api/requests/view_role_requests').success(function(response) {
                    $scope.pendingRR = response;

                    angular.forEach ($scope.pendingRR, function(user) {
                        if (user.role == "teacher")
                            user.role = "Docente";
                        else if (user.role =="student")
                           user.role = "Studente";
                    });
                });
            };  
            
            $scope.acceptRoleRequest = function (email) {
                var value = { email: email};
                $http.post('/api/requests/accept_role_request', value).success(function(response){
                    $window.location.href = '/Quizzipedia/viewPendingRequests';
                }).error(function(response){
                    alert("Errore");
                });
            };
            
            $scope.discardRoleRequest = function (email) {
                var value = { email: email};
                $http.post('/api/requests/discard_role_request', value).success(function(response){
                    $window.location.href = '/Quizzipedia/viewPendingRequests';
                }).error(function(response){
                    alert("Errore");
                });
            };
            
            $scope.loadPendingRR();
        }
    };
}]);