angular.module('managerInstitution').controller ('CtrlPagination', ['Class', 'Institution', '$scope', function (Class, Institution, $scope) { 
    
    $scope.data = $scope.institution.classes;
    
    $scope.viewby = 5;          

    $scope.currentPage = 1;

    $scope.itemsPerPage = $scope.viewby;

    $scope.maxSize = 5; //Number of pager buttons to show
    
    $scope.totalItems = 50; //$scope.data.length;
    
    
    /*$scope.pageChanged = function() {

    console.log('Page changed to: ' + $scope.currentPage);

   };*/

    $scope.setPage = function (pageNo) {

        $scope.currentPage = pageNo;

    }; 

    $scope.setItemsPerPage = function(num) {

        $scope.itemsPerPage = num;

        $scope.currentPage = 1; //reset to first paghe

    };   

}]);
                                                                                                                                                                         