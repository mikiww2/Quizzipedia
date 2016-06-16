/*
 * Nome del file: CtrlStatistics.js
 * Percorso: public/statistics/CtrlStatistics.js
 * Autore: Vault-Tech
 * Data creazione:
 * E-mail: vaulttech.swe@gmail.com
 *
 *  Controller per la visualizzazione delle statistiche
 *
 * * Diario delle modifiche:
 *
 */

angular.module('StatisticManager').controller('CtrlStatistics',['$scope','$http','$window',function($scope,$http,$window){
    
    
     $scope.fetchQuizzesStats = function(){
         $http.get('/api/statistic/quiz').success(function(response){
             
             console.log(response);
       });
 
    };

    $scope.fetchQuestionsStats = function(){
         $http.get('/api/statistic/question').success(function(response){
             
             console.log(response);
       });
 
    };

    $scope.fetchStudentsStats = function(){

         $http.post('/api/statistic/students',2).success(function(response){
             
             console.log(response);
       });
 
    };

    $scope.fetchTeachersStats = function(){
         $http.post('/api/statistic/teachers',6).success(function(response){
             
             console.log(response);
       });
 
    };

    $scope.fetchQuizzesStats();
    
}]); 
