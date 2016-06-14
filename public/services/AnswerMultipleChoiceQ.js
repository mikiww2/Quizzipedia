angular.module().factory('AnswerMultipleChoiceQ',['AnswerQuestion',function(AnswerQuestion){
    
    function AnswerMultipleChoiceQ(solver,question,answer){
        AnswerQuestion.call(this,solver,question);
        this.givenAnswer = answer; //bool[]
    };
    
    AnswerMultipleChoiceQ.prototype = AnswerQuestion.prototype;
    
    AnswerMultipleChoiceQ.prototype.check = function(){
        
    };
    
    AnswerMultipleChoiceQ.prototype.getGivenAnswer = function(){
      return this.givenAnswer;  
    };
    
    
    
    return AnswerMultipleChoiceQ;
    
    
}]);