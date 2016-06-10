angular.module('RequestsManager').directive ('pendingClass',['$window', function($window){
    
    return {
        restrict: 'E',
        templateUrl: './public/requests/pending_class.html',
        controller: function ($scope, $http) {
            
            $scope.pendingCR = null;
            $scope.request = null;
            
            $scope.loadPendingCR = function () {
                $http.get('/api/requests/view_class_requests').success(function(response) {
                    $scope.pendingCR = response;
                });
            };  
            
            $scope.acceptRoleRequest = function (email,clas) {
                var value = { email: email, class_id: clas};
                $http.post('/api/requests/accept_class_request', value).success(function(response){
                    $window.location.href = '/Quizzipedia/viewPendingRequests';
                }).error(function(response){
                    alert("Errore");
                });
            };
            
            $scope.discardRoleRequest = function (email,clas) {
                var value = { email: email, class_id: clas};
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