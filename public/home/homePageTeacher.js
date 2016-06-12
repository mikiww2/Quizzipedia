angular.module('Quizzipedia').directive('homePageTeacher', function() {
    return {
        restrict: 'E',
        templateUrl: './public/home/homepageTeacher.html',
        controller: function($scope, $http) {
            
            $scope.classes = [];
            $scope.teachersNumber = null;
            $scope.studentsNumber = null;
            
            $scope.loadClasses = function () {                
                $http.get('/api/class/fetch_classes_list').success (function (response) {
                    $scope.classes = response;
                });
            }

            $scope.loadStudentsTeachersNumber = function () {                
                $http.get('/api/institution/fetch_number_teachers').success (function (response) {
                    $scope.teachersNumber = response.number;
                });
                $http.get('/api/institution/fetch_number_students').success (function (response) {
                    $scope.studentsNumber = response.number;
                });
            }
            
            $scope.loadClasses();
            $scope.loadStudentsTeachersNumber();
        }
    };    
    
});