/*
 * Nome del file: homePageDirector.js
 * Percorso: public/home/homePageDirector.js
 * Autore: Vault-Tech
 * Data creazione:
 * E-mail: vaulttech.swe@gmail.com
 *
 *  Controller per la visualizzazione della homepage responsabile
 *
 * * Diario delle modifiche:
 *
 */

angular.module('Quizzipedia').directive('homePageDirector',function(){
    return {
      restrict: 'E',
      templateUrl: './public/home/homepageDirector.html',
      controller: function ($scope, $http) {
          
          $scope.pendingRR = [];
          $scope.pendingCR = [];  
          
          $scope.users = [];
          
          $scope.topics = [];
          
          $scope.classes = [];
          
          $scope.loadRequests = function () {
              $http.get('/api/requests/view_role_requests').success(function(response) {
                  $scope.pendingRR = response;
              });
              $http.get('/api/requests/view_class_requests').success(function(response) {
                  $scope.pendingCR = response;
              });
          }
          
          $scope.loadUsers = function () {
              $http.get('/api/institution/fetch_users_in_inst').success(function(response) {
                  $scope.users = response;
              });
          };
          
          $scope.loadTopics = function(){
              $http.get('/api/topic/fetch').success(function(response){
                  $scope.topics = response;
              });
          };
          
          $scope.loadClasses = function() {
              $http.get('/api/class/fetch_inst_classes').success(function(response) {
                  $scope.classes = response;
              });
          };
          
          $scope.loadRequests();
          $scope.loadUsers();
          $scope.loadTopics();
          $scope.loadClasses();
        }
    };
});