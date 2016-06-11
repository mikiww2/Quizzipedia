angular.module('UsersManager').controller ('CtrlUsers',[ '$scope', '$http', function($scope, $http){
    
    $scope.users = [];
    
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
    
    $scope.removeUser = function (mail) {
        var value = { user: mail};
        $http.post('/api/institution/remove_from_inst', value).success(function(response){
            var index = $scope.users.indexOf(mail);
            $scope.users.splice(index, 1);
        }).error(function(response){
            alert("Errore");
        });
    };
    
    $scope.loadUsers();
       
}]);