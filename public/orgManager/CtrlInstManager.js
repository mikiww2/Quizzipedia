angular.module('InstClassManager').controller('CtrlInstManager',['Class', '$scope', '$http', function (Class, $scope, $http){
    
    $scope.classes = [];
    $scope.myClass = new Class();
    $scope.index = null; 
    
    $scope.loadClasses = function() {
        $http.get('/api/class/fetch_inst_classes').success(function(response) {
            $scope.classes = response;
        });
    };
    
    $scope.createClass = function() {
        var request = { description : $scope.myClass.getDescription(), name : $scope.myClass.getName(), year : $scope.myClass.getAcademicYear()};
        $http.post('/api/class/create_class', request); 
        $scope.myClass = new Class();       
    };
    
    $scope.delete = function() {
        var request = {_id : $scope.classes[$scope.index]._id};
        $http.post('/api/class/remove_class', request);
        $scope.classes.splice($scope.index, 1);
        $scope.myClass = new Class();
        $scope.index = null;        
    };
    
    $scope.edit = function (){
        var request = {_id : $scope.classes[$scope.index]._id, description : $scope.myClass.getDescription()};
        $http.post('/api/class/update_class', request);
        $scope.classes[$scope.index].description = $scope.myClass.getDescription();
        $scope.myClass = new Class();
        $scope.class_id = null;
    };
    
    $scope.selectClass = function (indexOfClass) {
        $scope.myClass.edit($scope.classes[indexOfClass].description, $scope.classes[indexOfClass].name, $scope.classes[indexOfClass].academicYear);    
        $scope.index = indexOfClass;
    };
    
    $scope.loadClasses();
    
}]);
    
    
        
        