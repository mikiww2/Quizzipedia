angular.module().controller('CtrlQuiz',['$scope','$http','Teacher','Topics','Class','CompletionQ','MatchingQ','MultipleChoiceQ','ShortAnswerQ','TrueFalseQ',function($scope,$http,Teacher,Topics,Class,CompletionQ,MatchingQ,MultipleChoiceQ,ShortAnswerQ,TrueFalseQ){
    
    $scope.teacher = null;
    $scope.loadTeacher = function(){
        //inizializza $scope.teacher
    };
    
    $scope.topics = null;
    $scope.loadTopics = function(){
      //inizializza $scope.topics  
    };
    
    $scope.classes = [];
    $scope.loadClasses = function(){
      //inizializza $scope.classes  
    };
    
    
    $scope.myQuiz = {
      
        title: null,
        description: null,
        authorization: null,
        institution: null,
        classes: null,
        topic: null,
        difficulty: null,
        keywords: [],
        questions: [], //GenericQuestion
        addKeyword: function(keyword){
            
        },
        addQuestion: function(quiz){ //GenericQuiz
            
        }
        
    };
    
    $scope.save = function(myQuiz){
        
    };
    
    
    
}]);