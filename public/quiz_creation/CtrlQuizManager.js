angular.module('QuizManager').controller('CtrlQuizManager',['Quiz', '$scope', '$http', function (Quiz, $scope, $http){
    
    $scope.index = null; //PER LA RIMOZIONE, SE SUPERFLUO TOGLI
    
    $scope.quizzes = []; //Tutti i quiz del docente
    $scope.userClasses = [];
    $scope.topics = [];
    $scope.permission = null;
    $scope.difficolta = [{id : 1, name : 'Facile'}, {id : 2, name : 'Media'},  {id : 3, name : 'Difficile'}, {id : 4, name : 'Molto difficile'}];
    
    $scope.myQuiz = new Quiz(); //il quiz che sto creando
    
    $scope.searchQ = {author : null, topic : null, keyword : null, difficulty : null}; //parametri da cercare
    $scope.searchQuestions = []; //domande che corrispondono ai criteri di ricerca
    
    
    $scope.clearSearch = function() {
        $scope.searchQ = {author : null, topic : null, keyword : null, difficulty : null};
        $scope.searchQuestions = [];
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
            $scope.searchQuestions = response;
            
             angular.forEach ($scope.searchQuestions, function(question) {
                if (question.difficulty == 1)
                    question.difficulty = "Facile";
                else if (question.difficulty == 2)
                    question.difficulty = "Medio";
                else if (question.difficulty == 3)
                    question.difficulty = "Difficile";
                else if (question.difficulty == 4)
                    question.difficulty = "Molto difficile";
                 
                 if (question.type == "trfs")
                     question.type = "Risposta vero/falso";
                 else if (question.type == "mult")
                     question.type = "Risposta multipla";
                 else if (question.type == "open")
                     question.type = "Risposta aperta";
            });
            
        });        
    };
    
    $scope.addQuestion = function (questionToCheck) {
        //aggiunge la domanda corrente a myquiz.questions e la rimuove da searchQuestions, no chiamate ad db, lo facciamo in conferma
        var index = $scope.searchQuestions.indexOf(questionToCheck); 
        var presente = false;
        
        if ($scope.myQuiz.questions.length == 0)
             $scope.myQuiz.questions.push({_id : questionToCheck._id, title : questionToCheck.title});
        
        angular.forEach ($scope.myQuiz.questions, function(question) {
            if ($scope.searchQuestions[index]._id == question._id) 
                presente=true;
        });
        
        if (presente == false)
             $scope.myQuiz.questions.push({_id : questionToCheck._id, title : questionToCheck.title});
        
        $scope.searchQuestions.splice(index, 1);
    };
    
    $scope.removeQuestion = function (indexOfQuestion) {
        $scope.myQuiz.questions.splice(indexOfQuestion, 1);
    };
    
    $scope.saveQuiz = function () { 
        console.log("Sono in create");
        var request = JSON.stringify($scope.myQuiz);
        console.log(request);
        $http.post('/api/quiz/save', request)
            .success(function(response) {
                $scope.myQuiz = new Quiz();
                alert(response.message);
            }).error(function(){
                alert('Errore nel sistema');
            });
    };    
        
    $scope.modifyQuiz = function(quiz){
         //non sono sicuro vada quiz...
    };
    
    $scope.loadUserClasses();
    $scope.loadTopics();
    
}]);