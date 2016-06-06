angular.module('InstClassManager').controller('CtrlInstManager',['Class', '$scope', '$http', function (Class, $scope, $http){
    
    $scope.institution = 'prova'; 
    $scope.classes = [];
    $scope.myClass = new Class();
    
    $scope.loadClasses = function() {
        //richiede al server tutte le classi dell'ente
    };
    
    $scope.createClass = function() {
        var request = { description : $scope.myClass.getDescription(), name : $scope.myClass.getName(), year : $scope.myClass.getAcademicYear()};
        $http.post('/api/class/create_class', request);
        $scope.myClass = new Class();
    };
    
    $scope.loadClasses();
    
}]);
    
    
        
        