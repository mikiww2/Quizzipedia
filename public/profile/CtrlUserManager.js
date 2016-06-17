/*
 * Nome del file: CtrlUserManager.js
 * Percorso: public/profile/CtrlUserManager.js
 * Autore: Vault-Tech
 * Data creazione:
 * E-mail: vaulttech.swe@gmail.com
 *
 *  Controller per la gestione del profilo personale
 *
 * * Diario delle modifiche:
 *
 */

angular.module('ProfileManager').controller('CtrlUserManager',['$scope','$http',function($scope,$http){
    
    $scope.institutions = { 'Ancora in nessun ente' : 'Nessun ruolo assegnato' };
    $scope.oldPsw = null;
    $scope.newPsw = null;
    $scope.cNewPsw = null;
    $scope.recovering = false;  //indica se è un cambio pswd normale o un recuperoPswd
    $scope.emptystring = "";  //necessaria in caso cambio pswd normale
    $scope.imageProfile = null;
    
    
    $scope.loadUser = function() {
       //assegno l'oggetto utente ricevuto dal server a $scope.user  
         $http.get('/api/profile/get_user').success(function(response){
             console.log(response);
             $scope.imageProfile = response._img;
             $scope.user = response;            
             if(response.tmpPassword != undefined)  //nel caso ci si trovi nella pagina recuperoPswd
             $scope.recovering = true;
         })
         .error(function(response){
             $window.location.href = '/Quizzipedia/home';
             alert("Sessione scaduta");
         });        
     };

    $scope.loadInstitutions = function() {//chiediamo al server un oggetto contenente le affiliazioni dell'utente
        $http.get('/api/institution/fetch_user_inst').success(function(response) {
            $scope.institutions = response;
            
            angular.forEach ($scope.institutions, function(institution) {
                if (institution.role == "teacher")
                    institution.role = "Docente";
                else if (institution.role =="student")
                    institution.role = "Studente";
                else if (institution.role=="director")
                    institution.role = "Responsabile";
            });
        })        
   };
    
    $scope.loadInstitutions();
    $scope.loadUser();
    
    
}]);
