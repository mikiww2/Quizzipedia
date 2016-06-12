angular.module('Quizzipedia').directive('homePageTeacher', function() {
    return {
        restrict: 'E',
        templateUrl: './public/home/homepageTeacher.html',
        controller: function($scope, $http) {
            
            $scope.classes = [];
            
            $scope.loadClasses = function () {                
                $http.get('/api/class/fetch_classes_list').success (function (response) {
                    $scope.classes = response;
                });
            }
            
            $scope.loadClasses();
        }
    };    
    
});