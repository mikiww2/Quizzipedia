angular.module('QuizSolver').directive('quizExecTrueFalse',function(){
    
    return {
      restrict: 'E',
        templateUrl: './public/quiz_execution/quizExec_TrueFalse.html'
    };
    
});

angular.module('QuizSolver').directive('quizExecMultiple',function(){
    
    return {
      restrict: 'E',
        templateUrl: './public/quiz_execution/quizExec_Multiple.html'
    };
    
});

angular.module('QuizSolver').directive('quizExecOpen',function(){
    
    return {
      restrict: 'E',
        templateUrl: './public/quiz_execution/quizExec_Open.html'
    };
    
});


angular.module('QuizSolver').directive('quizExecCompletion',function(){
    
    return {
      restrict: 'E',
        templateUrl: './public/quiz_execution/quizExec_Completion.html'
    };
    
});

angular.module('QuizSolver').directive('quizExecMatching',function(){
    
    return {
      restrict: 'E',
        templateUrl: './public/quiz_execution/quizExec_Matching.html'
    };
    
});




