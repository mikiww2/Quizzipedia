angular.module('InstClassManager').controller('CtrlInstManager',['Class', '$scope', '$http', function (Class, $scope, $http){
    
    $scope.institution = 'prova'; 
    $scope.classes = [];
    $scope.myClass = new Class();
    $scope.class_id = null;
    
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
        var request = {_id : $scope.class_id};
        $http.post('/api/class/remove_class', request);
        $scope.myClass = new Class();
        $scope.class_id = null;        
    };
    
    $scope.edit = function (){
        var request = {_id : $scope.class_id, description : $scope.myClass.getDescription()};
        $http.post('/api/class/update_class', request);
        $scope.myClass = new Class();
        $scope.class_id = null;
    };
    
    $scope.selectClass = function (classs, id) {
        $scope.myClass.edit(classs.description, classs.name, classs.academicYear);    
        $scope.class_id = id;
    };
    
    $scope.loadClasses();
    
}]);
    
    
        
        