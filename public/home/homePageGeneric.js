/*
 * Nome del file: homePageGeneric.js
 * Percorso: public/home/homePageGeneric.js
 * Autore: Vault-Tech
 * Data creazione:
 * E-mail: vaulttech.swe@gmail.com
 *
 *  Controller per la visualizzazione della homepage di utente senza ruolo
 *
 * * Diario delle modifiche:
 *
 */

angular.module('Quizzipedia').directive('homePageGeneric', function(){
    return {
        restrict: 'E',
        templateUrl: './public/home/homepageGeneric.html',
        controller: function ($scope, $http, $window) {
            $scope.recentQuizzes = [];
            
            $scope.loadQuizzes = function () {
                
                var searchQ = {title : null, author : null, topic : null, keyword : null, difficulty : null};
                
                $http.post('/api/quiz/search', searchQ).success(function(response) {
                    $scope.recentQuizzes = response;
                    
                    angular.forEach ($scope.recentQuizzes, function(quiz) {
                        if (quiz.difficulty == 1)
                            quiz.difficulty = "Facile";
                        else if (quiz.difficulty == 2)
                            quiz.difficulty = "Medio";
                        else if (quiz.difficulty == 3)
                            quiz.difficulty = "Difficile";
                        else if (quiz.difficulty == 4)
                            quiz.difficulty = "Molto difficile";
                    });
                });
            };
            
            $scope.selectQuiz = function(quizToSolve) {
                $http.post('/api/quiz/prepare_quiz_execution', quizToSolve)
                    .success(function(response) {
                    $window.location.href = '/Quizzipedia/quizExec';
                });
            };
            
            $scope.loadQuizzes();            
        }
    }
});