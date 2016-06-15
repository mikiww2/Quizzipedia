/*
 * Nome del file: CtrlTeacherStats.js
 * Percorso: public/CtrlTeacherStats.js
 * Autore: Vault-Tech
 * Data creazione:
 * E-mail: vaulttech.swe@gmail.com
 *
 *  Controller che gestisce le statistiche dei docenti
 *
 * * Diario delle modifiche:
 *
 */

angular.module().controller('CtrlTeacherStats',['$scope','$http',function($scope,$http){
    
    $scope.teachers = []; //Teacher[]
    $scope.selectedTeacher = null;
    $scope.questions = []; //GenericQuestion
    
    $scope.loadTeachers = function(){
      //carico tutti i Teacher di questo instituto  
    };
    
    $scope.loadQuestions = function(){
      //carico tutte le domande del Teacher selezionato  
    };
    
    
}]);