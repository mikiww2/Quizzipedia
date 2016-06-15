/*
 * Nome del file: CtrlRecover.js
 * Percorso: public/authentic/CtrlRecover.js
 * Autore: Vault-Tech
 * Data creazione:
 * E-mail: vaulttech.swe@gmail.com
 *
 *  Controller per il recupero password
 *
 * * Diario delle modifiche:
 *
 */

angular.module('RecoverPswd').controller('CtrlRecover',['$scope','$http','$window',function($scope,$http,$window){
    
    $scope.email = null;
    $scope.message = null;

    $scope.sendRequest = function (){

    	var value = {
    		email: $scope.email
    	}

    	$http.post('/api/auth/recover_pswd', value)
            .success(function(response){
    			if(response.code == 0)
    				$window.location.href = '/Quizzipedia/signin_with_token';
    			else{
    				alert(response.message);
    			}
			}).error(function(response){
                alert("Errore");
            });
    };
}]);