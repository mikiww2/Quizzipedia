angular.module().factory('TrueFalseQ',['GenericQuestion',function(){
    
    function TrueFalseQ(){
       
        this.correctAnswer = null; //bool       
    };
        
    TrueFalseQ.prototype.setCorrectAnswer = function(answer){ //answer:bool
        this.correctAnswer = answer;
    };
    
    TrueFalseQ.prototype.createAnswerQuestion = function(answer){ //answer:bool
        
    };    
    
    return TrueFalseQ;
    
}]);