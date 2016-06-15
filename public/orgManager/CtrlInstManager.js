/*
 * Nome del file: CtrlInstManager.js
 * Percorso: public/orgManager/CtrlInstManager.js
 * Autore: Vault-Tech
 * Data creazione:
 * E-mail: vaulttech.swe@gmail.com
 *
 *  Controller per il reperimento della lista di enti
 *
 * * Diario delle modifiche:
 *
 */

angular.module('InstClassManager').controller('CtrlInstManager',['$scope', '$http', function ($scope, $http){
    
    $scope.institutions = [];    
    
    $scope.loadInstitutions = function() {
        $http.get('/api/institution/fetch_all_inst_infos').success(function(response) {
            $scope.institutions = response;
        });
    };
    
    $scope.loadInstitutions();
    
}]);
    
    
        
        
