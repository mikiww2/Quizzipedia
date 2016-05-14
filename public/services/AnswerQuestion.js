angular.module().factory('AnswerQuestion',['GenericQuestion',function(){
    
    function AnswerQuestion(solver,question){        
        this.question = question; //GenericQuestion       
    };   
    
    AnswerQuestion.prototype.getQuestion = function(){
      return this.question;  
    };
    
    AnswerQuestion.prototype.check(){
      //metodo astratto ritorna bool
    };
    
    
    return AnswerQuestion;
    
    
    
}]);