angular.module('QuizManager').controller('CtrlQuizManager',['Quiz', '$scope', '$http', function (Quiz, $scope, $http){
    
    $scope.quizzes = [];
    $scope.index = null;
    $scope.myQuiz = Quiz;
    
    $scope.loadQuizzes = function() {
        $http.get('some api').success(function(response) {
            $scope.quizzes = response;
        });
    };
    
    $scope.removeQuiz = function(){
        var request = {_id : $scope.quizzes[$scope.index]._id};
        $http.post('some api', request);
        $scope.quizzes.splice($scope.index, 1);
        //$scope.myQuiz = new Quiz();
        $scope.index = null;        
    };
        
    $scope.modifyQuiz = function(quiz){
         //non sono sicuro vada quiz...
    };
    
}]);