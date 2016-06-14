angular.module('InstClassManager').controller('CtrlInstManager',['$scope', '$http', function ($scope, $http){
    
    $scope.institutions = [];    
    
    $scope.loadInstitutions = function() {
        $http.get('/api/institution/fetch_all_inst_infos').success(function(response) {
            $scope.institutions = response;
        });
    };
    
    $scope.loadInstitutions();
    
}]);
    
    
        
        
