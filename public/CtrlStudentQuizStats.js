/*
 * Nome del file: CtrlStudentQuizStats.js
 * Percorso: public/CtrlStudentQuizStats.js
 * Autore: Vault-Tech
 * Data creazione:
 * E-mail: vaulttech.swe@gmail.com
 *
 *  Controller che gestisce le statistiche degli studenti
 *
 * * Diario delle modifiche:
 *
 */

angular.module().controller('CtrlStudentQuizStats',['$scope','$http',function($scope,$http){
    
    
    $scope.myStudentStats = {
      
        classes: [], //Class[]
        quiz: [], //Quiz
        selectedQuiz: null, //int
        result= null, //StudentsStatisticsQuiz
    };
    
    $scope.loadClasses = function(){
        //carico le classi dell'instituto
    };
    
    $scope.loadQuiz = function(){
      //carico tutti i quiz della classe selezionata  
    };
    
    $scope.loadStudentsStatsQuiz = function(){
      //chiedo al server di caricare le statistiche relative al quiz selezionato e andrò a settare $scope.myStundentsStats.result  
    };
    
}]);