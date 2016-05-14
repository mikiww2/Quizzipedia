angular.module().factory('AnswerShortAnswerQ',['AnswerQuestion',function(AnswerQuestion){
    
    function AnswerShortAnswerQ(solver,question,answer){
      
        AnswerQuestion.call(this,solver,question);
        this.givenAnswer = answer; //String
    };
    
    AnswerShortAnswerQ.prototype.check = function(){
        
    };
    
    AnswerShortAnswerQ.prototype.getGivenAnswer = function(){
      return this.givenAnswer;  
    };
    
    return AnswerShortAnswerQ;
    
    
    
}]);