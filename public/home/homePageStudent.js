/*
 * Nome del file: homePageStudent.js
 * Percorso: public/home/homePageStudent.js
 * Autore: Vault-Tech
 * Data creazione:
 * E-mail: vaulttech.swe@gmail.com
 *
 *  Controller per la visualizzazione della homepage studente
 *
 * * Diario delle modifiche:
 *
 */

angular.module('Quizzipedia').directive('homePageStudent',function(){
    
    return {
      restrict: 'E',
      templateUrl: './public/home/homepageStudent.html',
      controller: function ($scope, $http) {
          
          $scope.userClasses = [];
          
          $scope.userQuizzes = [];
          
          $scope.loadUserQuizzes = function(){
              $http.get('/api/quiz/get_solved_user_quiz').success(function(response){
                  $scope.userQuizzes = response;
                  console.log(response);
              });
          };
          
          $scope.success = function (percentage) {
              if (percentage >= 60)
                  return true;
              else
                  return false;
          };   
          
          $scope.fetchClassesWithQuiz = function () {
              $http.get('/api/class/fetch_classes_with_quiz').success(function(response) {
                  $scope.userClasses = response;
              });
          };
          
          $scope.fetchClassesWithQuiz();
          $scope.loadUserQuizzes();
        }
    };
    
});