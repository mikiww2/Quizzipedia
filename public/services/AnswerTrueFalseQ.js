angular.module().factory('AnswerTrueFalseQ',['AnswerQuestion',function(AnswerQuestion){
    
    function AnswerTrueFalseQ(solver,question,answer){
        
        AnswerQuestion.call(this,solver,question);
        this.givenAnswer = answer; //bool
        
    };
    
    
    AnswerTrueFalseQ.prototype.check = function(){
        
    };
    
    AnswerTrueFalseQ.prototype.getGivenAnswer = function(){
      return this.givenAnswer;  
    };
    
    return AnswerTrueFalseQ;
    
}]);