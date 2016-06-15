/*
 * Nome del file: CtrlSearchQuiz.js
 * Percorso: public/search/CtrlSearchQuiz.js
 * Autore: Vault-Tech
 * Data creazione:
 * E-mail: vaulttech.swe@gmail.com
 *
 *  Controller per la ricerca di quiz
 *
 * * Diario delle modifiche:
 *
 */

angular.module('QuizManager').controller('CtrlSearchQuiz',['Quiz', '$scope', '$http','$window', function (Quiz, $scope, $http, $window){
    
    $scope.searchQ = {title : null, author : null, topic : null, keyword : null, difficulty : null}; //parametri da cercare
    $scope.searchQuizzes = []; //quiz che corrispondono ai criteri di ricerca
    
    $scope.topics = [];
    $scope.difficolta = [{id : 1, name : 'Facile'}, {id : 2, name : 'Media'},  {id : 3, name : 'Difficile'}, {id : 4, name : 'Molto difficile'}];
    
    $scope.clearSearch = function() {
        $scope.searchQ = {title : null, author : null, topic : null, keyword : null, difficulty : null};
        $scope.searchQuizzes = [];
    };
    
    $scope.loadTopics = function () {
        $http.get('/api/topic/fetch_all').success(function(response) {
            $scope.topics = response;
        });
    };
    
    $scope.searchQuiz = function() {
        $http.post('/api/quiz/search', $scope.searchQ).success(function(response) {
            $scope.searchQuizzes = response;
            
             angular.forEach ($scope.searchQuizzes, function(quiz) {
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

    $scope.loadTopics(); 
    
}]);
