/*
 * Nome del file: CtrlIssues.js
 * Percorso: public/issues/CtrlIssues.js
 * Autore: Vault-Tech
 * Data creazione:
 * E-mail: vaulttech.swe@gmail.com
 *
 *  Controller che gestisce i quiz appartenenti a classi
 *
 * * Diario delle modifiche:
 *
 */

angular.module('Issues').controller('CtrlIssues',['$scope','$http','$window',function($scope,$http,$window){
    
    $scope.email = null;
    $scope.message = null;
    
    $scope.sendComunications = function () {

        var com = {
            email: $scope.email,
            message: $scope.message
        };
        console.log(com);
        
        $http.post('/api/admin/save_comunication',com).success (function (response) {
            alert(response.message);
            if(response.code == 0)
                $window.location.href = '/Quizzipedia/home';
        });

    }
    
    
    
}]);