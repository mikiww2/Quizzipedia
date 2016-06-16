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
    
    /*
    $scope.classSelected = null;
    $scope.classes = null;
    
    $scope.loadClasses = function(){
        $http.get('/api/class/fetch_classes_list').success(function(response){
            
            $scope.classes = response;
            
            
        });
    };
    
    
    $scope.loadClasses();
    */
    
    
    $scope.quiz = null;
    
    
    $scope.loadStatQuiz = function(){
        $http.get('/api/statistic/quiz').success(function(response){
            console.log(response);
            $scope.quiz = response;
        });
    };
    
    
    $scope.loadStatQuiz();
    
    
    
    
    
    
    /*
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
    $scope.fetchQuestionsStats();
    $scope.fetchStudentsStats();
    $scope.fetchTeachersStats();
    */
}]); 
