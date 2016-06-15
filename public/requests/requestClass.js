/*
 * Nome del file: requestClass.js
 * Percorso: public/requests/requestClass.js
 * Autore: Vault-Tech
 * Data creazione:
 * E-mail: vaulttech.swe@gmail.com
 *
 *  Controller per la gestione di richieste di classe
 *
 * * Diario delle modifiche:
 *
 */

angular.module('RequestsManager').directive('requestClass',['$window',function($window){    
    return{
      restrict: 'E',
      templateUrl: './public/requests/request_class.html',
      controller: function ($scope, $http) {
          
          $scope.user = null;
          $scope.institution = null;
          $scope.classes = "In questo ente non ci sono ancora classi";
          $scope.class = null;          
          
          $scope.loadUser = function() {
              //assegno l'oggetto utente ricevuto dal server a $scope.user
              $http.get('/api/profile/get_full_info_user').success(function(response){
                  $scope.user = response;
                  if ($scope.user.role=="teacher")
                      $scope.user.role = "Docente";
                  else if ($scope.user.role=="student")
                      $scope.user.role = "Studente";
                  else
                      $scope.user.role = "Responsabile";
              })
                  .error(function(response){
                  $window.location.href = '/Quizzipedia/home';
                  alert("Sessione scaduta");
              });        
          };       
          
          $scope.loadUser();
          
          $scope.loadClasses = function () {
              $http.get('/api/class/fetch_no_user_class').success(function(response) {
                  $scope.classes = response;
                  })
          }; 
          
          
          $scope.loadClasses();

          $scope.setClassId = function (id) {

                $scope.class = id;

            };
          
          
           $scope.sendClassRequest = function () {

                var value = { _id : $scope.class };
                $http.post('/api/requests/add_class_insert_request', value).success(function(response){
                  $window.location.href = '/Quizzipedia/sendRequest';
                }).error(function(response){
                  alert(response);
                });
            };
            
            
       }
    };
}]);