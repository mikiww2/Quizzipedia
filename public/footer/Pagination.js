angular.module('Quizzipedia').controller ('CtrlPagination', ['$scope', function ($scope) { 
    
    $scope.currentPage = 1;

    $scope.itemsPerPage = 5;

    $scope.maxSize = 5; //Number of pager buttons to show
    
    $scope.setPage = function (pageNo) {

        $scope.currentPage = pageNo;

    }; 

    $scope.setItemsPerPage = function() {       

        $scope.currentPage = 1; //reset to first paghe

    };   

}]);
                                                                                                                                                                         