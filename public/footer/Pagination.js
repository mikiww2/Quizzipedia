/*
 * Nome del file: Pagination.js
 * Percorso: public/footer/Pagination.js
 * Autore: Vault-Tech
 * Data creazione:
 * E-mail: vaulttech.swe@gmail.com
 *
 *  Controller che gestisce la paginazione
 *
 * * Diario delle modifiche:
 *
 */

angular.module('Quizzipedia').controller ('CtrlPagination', ['$scope', function ($scope) { 
    
    $scope.currentPage = 1;

    $scope.itemsPerPage = 6;

    $scope.maxSize = 5; //Number of pager buttons to show
    
    $scope.setPage = function (pageNo) {

        $scope.currentPage = pageNo;

    }; 

    $scope.setItemsPerPage = function() {       

        $scope.currentPage = 1; //reset to first paghe

    };   

}]);
                                                                                                                                                                         