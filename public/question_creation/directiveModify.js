angular.module('QuestionManager').directive('modifyQtf',function(){
    
    return {
      restrict: 'E',
        templateUrl: './public/question_creation/modifyQTF.html'
    };
    
});

angular.module('QuestionManager').directive('modifyQmatch',function(){
    
    return {
        restrict: 'E',
        templateUrl: './public/question_creation/modifyQMatch.html'
    };
    
});

angular.module('QuestionManager').directive('modifyQopen',function(){
    
    return {
        restrict: 'E',
        templateUrl: './public/question_creation/modifyQOpen.html'
    };
    
});

angular.module('QuestionManager').directive('modifyQcompletion',function(){
    
    return {
      restrict: 'E',
        templateUrl: './public/question_creation/modifyQCompletion.html'
    };
    
});

angular.module('QuestionManager').directive('modifyQmultiple',function(){

    return {
       restrict: 'E',
        templateUrl: './public/question_creation/modifyQMultiple.html'
    };

});