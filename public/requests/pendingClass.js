angular.module('RequestsManager').directive ('pendingClass',['$window', function($window){
    
    return {
        restrict: 'E',
        templateUrl: './public/requests/pending_class.html',
        controller: function ($scope, $http) {
            
            $scope.pendingCR = null;
            $scope.request = null;
            
            $scope.loadPendingCR = function () {
                $http.get('SOME API').success(function(response) {
                    $scope.pendingCR = response;
                });
            };  
            
            $scope.acceptRoleRequest = function (email) {
                var value = { email: email};
                $http.post('/api/requests/accept_class_request', value).success(function(response){
                    $window.location.href = '/Quizzipedia/viewPendingRequests';
                }).error(function(response){
                    alert("Errore");
                });
            };
            
            $scope.discardRoleRequest = function (email) {
                var value = { email: email};
                $http.post('/api/requests/discard_class_request', value).success(function(response){
                    $window.location.href = '/Quizzipedia/viewPendingRequests';
                }).error(function(response){
                    alert("Errore");
                });
            };
            
            $scope.loadPendingCR();
        }
    };
}]);