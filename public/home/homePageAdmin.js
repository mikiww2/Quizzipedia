/*
 * Nome del file: homePageTeacher.js
 * Percorso: public/home/homePageTeacher.js
 * Autore: Vault-Tech
 * Data creazione:
 * E-mail: vaulttech.swe@gmail.com
 *
 *  Controller per la visualizzazione della homepage docente
 *
 * * Diario delle modifiche:
 *
 */

angular.module('Quizzipedia').directive('homePageAdmin', function() {
    return {
        restrict: 'E',
        templateUrl: './public/home/homepageAdmin.html',
        controller: function($scope, $http, $window) {
            
            $scope.communications = [];
            
            $scope.instDir = null;
            $scope.InstName = null;
            
            $scope.loadCommunications = function () {                
                $http.get('/api/admin/fetch_comunications').success (function (response) {
                    $scope.communications = response;
                });
            }

            $scope.removeCommunication = function (idOfComm, indexOfComm) {
                $http.post('/api/admin/remove_comunications', {_id: idOfComm}).success (function (response) {
                    if(response.code == 0){
                        $scope.communications.splice(indexOfComm, 1);                       
                    }
                    else alert(response.message);
                });
            };
            
            $scope.createInst = function () {
                
                var newInst = {email : $scope.instDir, orgName : $scope.instName};
                
                $http.post('/api/institution/create_new_institution', newInst)
                    .success (function (response) {
                    if(response.code == 0){
                        alert(response.message);
                        $window.location.href = '/Quizzipedia/home';
                    }
                    else alert(response.message);
                });
                
            };
            
            $scope.loadCommunications();

        }
    };    
    
});