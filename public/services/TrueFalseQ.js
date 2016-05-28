angular.module('CreateQuestion').factory('TrueFalseQ',['GenericQuestion',function(GenericQuestion){
    
    function TrueFalseQ(){
       GenericQuestion.call(this);
        this.correctAnswer = null; //bool       
    };
        
    TrueFalseQ.prototype.setCorrectAnswer = function(answer){ //answer:bool
        this.correctAnswer = answer;
    };
    
    TrueFalseQ.prototype.createAnswerQuestion = function(answer){ //answer:bool
        
    };
    
    
    TrueFalseQ.prototype = GenericQuestion.prototype;
    
    return TrueFalseQ;
    
}]);