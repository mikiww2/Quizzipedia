angular.module().factory('ShortAnswer',['GenericQuestion',function(){
    
    function ShortAnswer(){
      
        this.correctAnswer = null; //String
        
    };
    
    ShortAnswer.prototype.createAnswerQuestion = function(answer){ //answer:String
        
    };
    
    ShortAnswer.prototype.setCorrectAnswer = function(newCorrectAnswer){
        this.correctAnswer = newCorrectAnswer;
    };
    
    
}]);