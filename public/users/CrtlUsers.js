angular.module('UserManager').directive ('ctrlUser',['$window', function($window){
    
    return {
        restrict: 'E',
        templateUrl: './public/requests/pending_role.html',
        controller: function ($scope, $http) {
            
            $scope.users = null;
            
            $scope.loadUsers = function () {
                $http.get('/api/institution/fetch_users_in_inst').success(function(response) {
                    $scope.users = response;
                });
            };  
            
            $scope.removeUser = function (email) {
                var value = { user: email};
                $http.post('/api/institution/remove_from_inst', value).success(function(response){
                    $window.location.href = 'Quizzipedia/removeUser';
                }).error(function(response){
                    alert("Errore");
                });
            };
            
            $scope.loadUsers();
        }
    };
}]);