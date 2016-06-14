angular.module().factory('AnswerQuestion',['GenericQuestion',function(){
    
    function AnswerQuestion(solver,question){        
        this.question = question; //GenericQuestion 
        this.solver = solver; //studente che ha risolto la domanda
    };   
    
    AnswerQuestion.prototype.getQuestion = function(){
      return this.question;  
    };
    
    AnswerQuestion.prototype.check(){
      //metodo astratto ritorna bool
    };
    
    
    return AnswerQuestion;
    
    
    
}]);