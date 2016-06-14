angular.module().factory('AnswerCompletionQ',['AnswerQuestion',function(AnswerQuestion){
    
    function AnswerCompletionQ(solver,question,answer){
      
        AnswerQuestion.call(this,solver,question);
        this.givenAnswer = answer; //String[]
        
        
    };
    
    AnswerCompletionQ.prototype.check = function(){
        /*
        so che i buchi si trovano nell'array testo con indice dispari e lo incremento ogni volta di 2
        leggo l'id del buco e cerco nelle risposte il buco con quell'id confronto la risposta corretta con quella
        che ha dato l'utente
        
        */
    };
    
    AnswerCompletionQ.prototype.getGivenAnswer = function(){
      return this.givenAnswer;  
    };
    
    return AnswerCompletionQ;
    
    
    
}]);