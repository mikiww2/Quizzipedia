angular.module('QuizManager').controller('CtrlQuizManager',['Quiz', '$scope', '$http', function (Quiz, $scope, $http){
    
    $scope.quizzes = [];
    $scope.index = null;
    $scope.myQuiz = null;
    $scope.userClasses = [];
    $scope.topics = [];
    $scope.permission = null;
    $scope.quizCookie = null;
    $scope.mode = 0;
    
    $scope.loadQuiz = function() {
        if ($scope.myQuiz == null)
            $scope.myQuiz == new Quiz();
    };
    
    $scope.loadQuizzes = function() {
        $http.get('some api').success(function(response) {
            $scope.quizzes = response;
        });
    };
    
    $scope.loadUserClasses = function () {
        $http.get(' /api/class/fetch_classes_details').success(function(response) {
            $scope.userClasses = response;
        });
    };
    
    $scope.loadTopics = function () {
        $http.get('/api/topic/fetch').success(function(response) {
            $scope.topics = response;
        });
    }; 
    
    $scope.removeQuiz = function(){
        var request = {_id : $scope.quizzes[$scope.index]._id};
        $http.post('some api', request);
        $scope.quizzes.splice($scope.index, 1);
        //$scope.myQuiz = new Quiz();
        $scope.index = null;        
    };
    
    $scope.changeMode = function(int) {
        $scope.mode = int;
    };
    
    $scope.createQuiz = function () {
        
    };    
        
    $scope.modifyQuiz = function(quiz){
         //non sono sicuro vada quiz...
    };
    
    $scope.loadUserClasses();
    $scope.loadTopics();
    $scope.loadQuiz();
    
}]);