angular.module('QuizManager').controller('CtrlSearchQuiz',['Quiz', '$scope', '$http', function (Quiz, $scope, $http){
    
    $scope.searchQ = {title : null, author : null, topic : null, keyword : null, difficulty : null}; //parametri da cercare
    $scope.searchQuizzes = []; //quiz che corrispondono ai criteri di ricerca
    
    $scope.topics = [];
    $scope.difficolta = [{id : 1, name : 'Facile'}, {id : 2, name : 'Media'},  {id : 3, name : 'Difficile'}, {id : 4, name : 'Molto difficile'}];
    
    $scope.clearSearch = function() {
        $scope.searchQ = {title : null, author : null, topic : null, keyword : null, difficulty : null};
        $scope.searchQuizzes = [];
    };
    
    $scope.loadTopics = function () {
        $http.get('/api/topic/fetch').success(function(response) {
            $scope.topics = response;
        });
    };
    
    $scope.searchQuiz = function() {
        $http.post('/api/quiz/search', $scope.searchQuiz).success(function(response) {
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
    
    $scope.loadTopics();
   
    
}]);