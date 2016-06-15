/*
 * Nome del file: CtrlData.js
 * Percorso: public/authentic/CtrlData.js
 * Autore: Vault-Tech
 * Data creazione:
 * E-mail: vaulttech.swe@gmail.com
 *
 *  Controller che gestisce l'autenticazione
 *
 * * Diario delle modifiche:
 *
 */

angular.module('Authentication').controller('CtrlSignin',['$scope','$http','$window',function($scope,$http,$window){
    
    $scope.email = null;
    $scope.password = null;
    $scope.signin = function(){
    	var user = {
    		email: $scope.email,
    		password: $scope.password
    	};
          
      $http.post('/api/auth/signin', user)
		      .success(function(response){
		          if(response.code == 0)
		            $window.location.href = '/Quizzipedia/home';
		          if(response.code == 1)
		          	alert(response.message);
		      }).error(function(response){
		          alert("Errore");
		      });
    };
    
}]); 
