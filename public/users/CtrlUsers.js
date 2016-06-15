/*
 * Nome del file: CtrlUsers.js
 * Percorso: public/users/CtrlUsers.js
 * Autore: Vault-Tech
 * Data creazione:
 * E-mail: vaulttech.swe@gmail.com
 *
 *  Controller per la gestione degli utenti
 *
 * * Diario delle modifiche:
 *
 */

angular.module('UsersManager').controller ('CtrlUsers',[ '$scope', '$http', function($scope, $http){
    
    $scope.users = [];
    $scope.userToRemove = null;
    
    $scope.loadUsers = function () {
        $http.get('/api/institution/fetch_users_in_inst').success(function(response) {
            $scope.users = response;
            
            angular.forEach ($scope.users, function(user) {
                if (user.role == "teacher")
                    user.role = "Docente";
                else if (user.role =="student")
                   user.role = "Studente";
            });
        });
    };

    $scope.setUserToRemove = function(fullUser) {
        $scope.userToRemove = fullUser;
    };
    
    $scope.removeUser = function () {
        var value = { user: $scope.userToRemove.user};
        
        $http.post('/api/institution/remove_from_inst', value).success(function(response){
            var index = $scope.users.indexOf($scope.userToRemove);
            $scope.users.splice(index, 1);
        }).error(function(response){
            alert("Errore");
        });
    };
    
    $scope.loadUsers();
       
}]);