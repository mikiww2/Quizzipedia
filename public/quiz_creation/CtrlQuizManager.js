angular.module('QuizManager').controller('CtrlQuizManager',['Quiz', 'GenericQuestion', '$scope', '$http', function (Quiz, GenericQuestion, $scope, $http){
    
    $scope.questions = [];
    $scope.index = null;
    $scope.myQuiz = new Quiz();
    $scope.userClasses = [];
    $scope.topics = [];
    $scope.permission = null;
    $scope.searchQ = {title : null, author : null, topic : null, keywords : [], difficulty : null};
    
    $scope.myJSONQuiz=null;
    
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
    
    $scope.searchQuestion = function() {
        $http.post('/api/question/search', $scope.searchQ).success(function(response) {
            $scope.questions = response;
        });        
    };
    
    $scope.toString = function () {
        console.log("Sono in stringify");
        $scope.myJSONQuiz = JSON.stringify($scope.myQuiz);
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