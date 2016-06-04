angular.module('RequestsManager').directive('requestRole', function(){
    
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
                    $window.location.href = '/Quizzipedia/home.html';
                    alert("Sessione scaduta");
                });        
            };
    
            $scope.loadInst = function () {
                $http.get('/api/institution/fetch_no_user_inst').success(function(response) {
                $scope.institutions = response;
                })
            };            
            
            
            $scope.sendRoleRequest = function () {                
                var request = { user : $scope.user._id, institution : $scope.institution, role : $scope.role, message: $scope.message };
                
                //$http.post('Definire api', request);
            };
            
            $scope.loadUser();
            $scope.loadInst();
       }
    };
});