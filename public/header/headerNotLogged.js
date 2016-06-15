/*
 * Nome del file: headerNotLogged.js
 * Percorso: public/header/headerNotLogged.js
 * Autore: Vault-Tech
 * Data creazione:
 * E-mail: vaulttech.swe@gmail.com
 *
 *  Direttiva per la visualizzazione del header da non loggati
 *
 * * Diario delle modifiche:
 *
 */

angular.module('Quizzipedia').directive('headerNotLogged',function(){
    
    return{
        restrict: 'E',
        templateUrl: './public/header/header_notLogged.html',
        controller: function ($scope, $http, $window) {
            
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
                        $window.location.href='/Quizzipedia/home';
                    if(response.code == 1)
                        alert(response.message);
                }).error(function(response){
                    alert("Errore");
                });
            };
        }
        
    };
    
    
});