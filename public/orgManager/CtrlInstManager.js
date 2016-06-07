angular.module('InstClassManager').controller('CtrlInstManager',['Class', '$scope', '$http', function (Class, $scope, $http){
    
    $scope.institution = 'prova'; 
    $scope.classes = [];
    $scope.myClass = new Class();
    
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
        //manda al server name e academicYear di myClass e la svuota
        $scope.myClass = new Class(); 
    };
    
    $scope.edit = function (){
        //in myClass sono salvate le nuove info. Ricordarsi dopo di svuotare myClass
    };
    
    $scope.selectClass = function (classs) {
        $scope.myClass.edit(classs.description, classs.name, classs.academicYear);        
    };
    
    $scope.loadClasses();
    
}]);
    
    
        
        