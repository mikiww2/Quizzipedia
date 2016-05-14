angular.module().factory('AnswerMatchingQ',['AnswerQuestion','AnswerColumn',function(AnswerQuestion,AnswerColumn){
    
    function AnswerMatchingQ(solver,question,answer){
        
        AnswerQuestion.call(this,solver,question);
        this.givenAnswerColumn = answer; //tipo AnswerColumn
        
    };
    
    
    AnswerMatchingQ.prototype.check = function(){
        
    };
    
    AnswerMatchingQ.prototype.setGivenAnswerColumn = function(answer){ //answer:AnswerColumn
    
        this.givenAnswerColumn = answer;
    };
    
    AnswerMatchingQ.prototype.getGivenAnswerColumn = function(){
      
        return this.givenAnswerColumn;
    };
    
    return AnswerMatchingQ;
    
    
    
}]);