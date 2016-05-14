angular.module().factory('AnswerCompletionQ',['AnswerQuestion',function(AnswerQuestion){
    
    function AnswerCompletionQ(solver,question,answer){
      
        AnswerQuestion.call(this,solver,question);
        this.givenAnswer = answer; //String[]
    };
    
    AnswerCompletionQ.prototype.check = function(){
        
    };
    
    AnswerCompletionQ.prototype.getGivenAnswer = function(){
      return this.givenAnswer;  
    };
    
    return AnswerCompletionQ;
    
    
    
}]);