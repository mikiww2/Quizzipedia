/*
 * Nome del file: requestRole.js
 * Percorso: public/requests/requestRole.js
 * Autore: Vault-Tech
 * Data creazione:
 * E-mail: vaulttech.swe@gmail.com
 *
 *  Controller per la gestione di richieste di ruolo
 *
 * * Diario delle modifiche:
 *
 */

angular.module('RequestsManager').directive('requestRole',['$window', function($window){
    
    return {
        restrict: 'E',
        templateUrl: './public/requests/request_role.html',
        controller: function ($scope, $http) {
            
            $scope.user = null;
            $scope.institutions = null;
            $scope.institution = "Nessun ente selezionato";
            $scope.role = null;
            $scope.message = null;
    
            $scope.loadUser = function() {
                //assegno l'oggetto utente ricevuto dal server a $scope.user  
                $http.get('/api/profile/get_full_info_user').success(function(response){
                    $scope.user = response;
                })                
                .error(function(response){
                    $window.location.href = '/Quizzipedia/home';
                    alert("Sessione scaduta");
                });        
            };
    
            $scope.loadInst = function () {
                $http.get('/api/institution/fetch_no_user_inst').success(function(response) {
                $scope.institutions = response;
                });
            };            
            
            
            $scope.sendRoleRequest = function () {
                if($scope.role == 'Studente')
                    $scope.role = 'student';
                else $scope.role = 'teacher';
                var request = { user : $scope.user._id, institution : $scope.institution, role : $scope.role, message: $scope.message };
                
                $http.post('/api/requests/add_inst_role_request', request).success(function(response) {
                    $window.location.href = response;
                });
            };
            
            $scope.loadUser();
            $scope.loadInst();
       }
    };
}]);