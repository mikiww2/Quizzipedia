angular.module().factory('AnswerTrueFalseQ',['AnswerQuestion',function(AnswerQuestion){
    
    function AnswerTrueFalseQ(solver,question,answer){
        
        AnswerQuestion.call(this,solver,question);
        this.givenAnswer = answer; //bool
        
    };
    
    AnswerTrueFalseQ.prototype = AnswerQuestion.prototype;
    
    
    AnswerTrueFalseQ.prototype.check = function(){
        //guardo la givenAnswer e vedo se è uguale alla risposta dentro il riferimento question
    };
    
    AnswerTrueFalseQ.prototype.getGivenAnswer = function(){
      return this.givenAnswer;  
    };
    
    AnswerTrueFalseQ.prototype.setGivenAnswer = function(answer){
      this.givenAnswer = answer;  
    };
    
    return AnswerTrueFalseQ;
    
}]);