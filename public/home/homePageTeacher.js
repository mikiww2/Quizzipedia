/*
 * Nome del file: homePageTeacher.js
 * Percorso: public/home/homePageTeacher.js
 * Autore: Vault-Tech
 * Data creazione:
 * E-mail: vaulttech.swe@gmail.com
 *
 *  Controller per la visualizzazione della homepage docente
 *
 * * Diario delle modifiche:
 *
 */

angular.module('Quizzipedia').directive('homePageTeacher', function() {
    return {
        restrict: 'E',
        templateUrl: './public/home/homepageTeacher.html',
        controller: function($scope, $http) {
            
            $scope.classes = [];
            $scope.teachersNumber = null;
            $scope.studentsNumber = null;
            $scope.questionsNumber = null;
            $scope.quizNumber = null;
            
            $scope.loadClasses = function () {                
                $http.get('/api/class/fetch_classes_list').success (function (response) {
                    $scope.classes = response;
                });
            }

            $scope.loadStudentsTeachersNumber = function () {                
                $http.get('/api/institution/fetch_number_teachers').success (function (response) {
                    $scope.teachersNumber = response.number;
                });
                $http.get('/api/institution/fetch_number_students').success (function (response) {
                    $scope.studentsNumber = response.number;
                });
            }

            $scope.loadQuestionsNumber = function () {                
                $http.get('/api/question/fetch_questions_number').success (function (response) {
                    $scope.questionsNumber = response.number;
                });
            }

            $scope.loadQuizNumber = function () {                
                $http.get('/api/quiz/fetch_quiz_number').success (function (response) {
                    $scope.quizNumber = response.number;
                });
            }
            
            $scope.loadClasses();
            $scope.loadStudentsTeachersNumber();
            $scope.loadQuestionsNumber();
            $scope.loadQuizNumber();
        }
    };    
    
});