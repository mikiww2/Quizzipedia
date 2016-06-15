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

angular.module('Registration').controller('CtrlData',['$scope','$http','$window',function($scope,$http,$window){
    
    $scope.user = {
      
        firstName: null,
        lastName: null,
        email: null,
        cemail: null,
        password: null,
        cpassword: null,
        checkMail: function(){
            return $scope.user.email == $scope.user.cemail;
        },
        checkPassword: function(){
            return $scope.user.password == $scope.user.cpassword;
        },
        sendRegistration: function(){
            
            var condition = true;
            
            if(!$scope.user.checkMail()){
                condition = false;
                alert("Le mail non coincidono");
            }
            
            if(!$scope.user.checkPassword()){
                condition = false;
                alert("Le password non coincidono");
            }
            
            if(condition){
                //salva tutto nel server
                $http.post('/api/auth/signup', $scope.user)
                .success(function(response){
                    alert(response.message);
                    if(response.code == 0)
                        $window.location.href = '/Quizzipedia/signin';
                }).error(function(response){
                    alert("Errore");
                });
            }
        }
        
    };
    
}]);