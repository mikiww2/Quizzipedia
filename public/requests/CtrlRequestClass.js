angular.module('managerRequest').controller('CtrlRequestClass',['$scope','ClassList','Institution','Class',function($scope,ClassList,Institution,Class){   
    $scope.institution = [];
    
    var inst = new Institution("09/05/2016","A");
    inst.addClass(new Class(null,"Aa","2016"));
    inst.addClass(new Class(null,"Ab","2016"));
    inst.addClass(new Class(null,"Ac","2016"));
    
    $scope.institution.push(inst);
    
    inst = new Institution("09/05/2016","B");
    inst.addClass(new Class(null,"Ba","2016"));
    inst.addClass(new Class(null,"Bb","2016"));
    inst.addClass(new Class(null,"Bc","2016"));
    
    $scope.institution.push(inst);
    
    $scope.sendClassRequest= {
      
        institutionSelect: null,
        classSelect: null,
        //roleUser: null,
        yearSelect: null,
        sendRequest: function (sendClassRequest){
            //
        }
        
    };
    
    
    
    
    
    
    
}]);