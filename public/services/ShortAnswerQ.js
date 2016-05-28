angular.module('CreateQuestion').factory('ShortAnswerQ',['GenericQuestion',function(GenericQuestion){
    
    function ShortAnswer(){
        GenericQuestion.call(this);
        this.correctAnswer = null; //String
        
    };
    
    ShortAnswer.prototype = GenericQuestion.prototype;
    
    
    ShortAnswer.prototype.createAnswerQuestion = function(answer){ //answer:String
        
    };
    
    ShortAnswer.prototype.setCorrectAnswer = function(newCorrectAnswer){
        this.correctAnswer = newCorrectAnswer;
    };
    
    return ShortAnswer;
    
    
}]);