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
    
    $scope.loadUserQuizzes();
    
}]);
