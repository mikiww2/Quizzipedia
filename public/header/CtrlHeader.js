/*
 * Nome del file: CtrlHeader.js
 * Percorso: public/header/CtrlHeader.js
 * Autore: Vault-Tech
 * Data creazione:
 * E-mail: vaulttech.swe@gmail.com
 *
 *  Controller per la gestione del header
 *
 * * Diario delle modifiche:
 *
 */

angular.module('Quizzipedia').controller('CtrlHeader',['$scope','$http','$window',function($scope,$http,$window){    
    
    $scope.user = null;
    $scope.institutions = { 'Ancora in nessun ente' : 'Nessun ruolo assegnato' };
    $scope.noInstitution = "Nessun ente selezionato";
    $scope.currentHeader = null;
    $scope.email = null;
    $scope.password = null;

    $scope.signin = function(){
      var userr = {
        email: $scope.email,
        password: $scope.password
      };
      
          
      $http.post('/api/auth/signin', userr)
          .success(function(response){
              if(response.code == 0)
                $window.location.href = '/Quizzipedia/home';
              if(response.code == 1)
                alert(response.message);
          }).error(function(response){
              alert("Errore");
          });
    };
    
    $scope.loadUser = function() {
      //assegno l'oggetto utente ricevuto dal server a $scope.user  
        $http.get('/api/profile/get_full_info_user').success(function(response){
            $scope.user = response;  
            })    
    };
    
    $scope.loadInstitutions = function() {//chiediamo al server un oggetto contenente le affiliazioni dell'utente
        $http.get('/api/institution/fetch_user_inst').success(function(response) {
            $scope.institutions = response;
        })        
   };
    
    $scope.changeInst = function(orgName){
      
      var name = { organizationName : orgName};
        $http.post('/api/institution/change_inst', name);       
        
        /*.success(function(response) {
            $route.reload();
        })    */    
   };
    
   $scope.loadUser();
   $scope.loadInstitutions();
   
    
}]);