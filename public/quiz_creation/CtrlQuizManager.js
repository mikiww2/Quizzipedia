angular.module('QuizManager').controller('CtrlQuizManager',['Quiz', 'GenericQuestion', '$scope', '$http', function (Quiz, GenericQuestion, $scope, $http){
    
    $scope.index = null; //PER LA RIMOZIONE, SE SUPERFLUO TOGLI
    
    $scope.quizzes = []; //Tutti i quiz del docente
    $scope.userClasses = [];
    $scope.topics = [];
    $scope.permission = null;
    $scope.difficolta = [{id : 1, name : 'Facile'}, {id : 2, name : 'Media'},  {id : 3, name : 'Difficile'}, {id : 4, name : 'Molto difficile'}];
    
    $scope.myQuiz = new Quiz(); //il quiz che sto creando
    
    $scope.searchQ = {author : null, topic : null, keyword : null, difficulty : null}; //parametri da cercare
    $scope.searchQuestions = []; //domande che corrispondono ai criteri di ricerca
    
    
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
            $scope.searchQuestions = response;
        });        
    };
    
    $scope.addQuestion = function (question) {
        //aggiunge la domanda corrente a myquiz.questions e la rimuove da searchQuestions, no chiamate ad db, lo facciamo in conferma
        var index = $scope.searchQuestions.indexOf(question);
        $scope.searchQuestions.splice(index, 1);
        var index = $scope.myQuiz.questions.indexOf(question);
        $scope.myQuiz.questions.splice(index, 1);        
    };
    
    $scope.removeQuestion = function (indexOfQuestion) {
        $scope.myQuiz.questions.splice(indexOfQuestion, 1);
    };
    
    $scope.createQuiz = function () {        
        
    };    
        
    $scope.modifyQuiz = function(quiz){
         //non sono sicuro vada quiz...
    };
    
    $scope.loadUserClasses();
    $scope.loadTopics();
    
}]);