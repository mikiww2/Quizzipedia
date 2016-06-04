angular.module('RequestsManager').directive('requestClass',function(){    
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
                  $window.location.href = '/Quizzipedia/home.html';
                  alert("Sessione scaduta");
              });        
          };       
          
          $scope.loadUser();
          
          /*$scope.loadClasses = function () {
          $http.get('/api/institution/fetch_no_user_inst').success(function(response) {
          $scope.institutions = response;
          })
          }; 
          
          //$scope.loadClasses();*/        
          
          
           /*$scope.sendRoleRequest = function () {                
                var request = { user : $scope.user._id, institution : $scope.institution, role : $scope.role, message: $scope.message };
                
                //$http.post('Definire api', request);
            };
            
            */
            
       }
    };
});