angular.module('ProfileManager').controller('CtrlUserManager',['$scope','$http',function($scope,$http){
    
    $scope.institutions = { 'Ancora in nessun ente' : 'Nessun ruolo assegnato' };
    $scope.oldPsw = null;
    $scope.newPsw = null;
    $scope.cNewPsw = null;
    $scope.recovering = false;  //indica se è un cambio pswd normale o un recuperoPswd
    $scope.emptystring = "";  //necessaria in caso cambio pswd normale
    

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
    
    
}]);
