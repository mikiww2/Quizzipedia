/*
 * Nome del file: CtrlQuizHistory.js
 * Percorso: public/quiz_execution/CtrlQuizHistory.js
 * Autore: Vault-Tech
 * Data creazione:
 * E-mail: vaulttech.swe@gmail.com
 *
 *  Controller per la gestione dell'esecuzione quiz
 *
 * * Diario delle modifiche:
 *
 */

angular.module('QuizManager').controller('CtrlQuizHistory',['$scope','$http', function($scope, $http){
    
    $scope.userQuizzes = [];
    $scope.quizResult = {rispTot : null, rispCorr : null, esito : null};
    
    $scope.loadUserQuizzes = function(){
            $http.get('/api/get_solved_user_quiz').success(function(response){
            $scope.quiz = response;
        });
        
    };
    
    $scope.loadResults = function(indexOfQuiz) {
        //Per un quiz conta: risposte tot, risposte  giuste, superamento e mette in quizResult
        
        var quizSelected = $scope.userQuizzes[indexOfQuiz];
        var totali = quizSelected.answers.length;
        var corrette = 0;
        var passato = false;
        
        angular.forEach(quizSelected.answers, function(answer) {
            if (answer === true)
                corrette=corrette +1;
        });
        
        var percentuale = (corrette * 100) / totali;
        
        if (percentuale >= 60) 
            passato = true;            
        
        $scope.quizResult = {rispTot : totali, rispCorr : corrette, esito : passato};      
    }; 
    
    $scope.loadUserQuizzes();
    
}]);
