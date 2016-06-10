angular.module('RequestsManager').directive ('pendingRole',['$window', function($window){
    
    return {
        restrict: 'E',
        templateUrl: './public/requests/pending_role.html',
        controller: function ($scope, $http) {
            
            $scope.pendingRR = null;
            
            $scope.loadPendingRR = function () {
                $http.get('/api/requests/view_role_requests').success(function(response) {
                    $scope.pendingRR = response;
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