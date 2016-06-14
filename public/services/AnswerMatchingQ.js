angular.module().factory('AnswerMatchingQ',['AnswerQuestion','AnswerMatchingQElement',function(AnswerQuestion,AnswerMatchingQElement){
    
    function AnswerMatchingQ(solver,question,answer){
        
        AnswerQuestion.call(this,solver,question);
        this.givenAnswerColumn = []; //array di AnswerMatchingQElement 
        
    };
    
    
    AnswerMatchingQ.prototype.check = function(){
        /*
        prendo la prima answer e leggo l'id, adesso vado a cercare nell'array delle risposte di question
        la risposta con quell'id e infine controllo se la risp che c'è in answer è uguale a quella che c'è 
        nell'answer di question
        
        */
    };
    
    AnswerMatchingQ.prototype.setGivenAnswerColumn = function(answer){ //answer:AnswerColumn
    
        this.givenAnswerColumn = answer;
    };
    
    AnswerMatchingQ.prototype.getGivenAnswerColumn = function(){
      
        return this.givenAnswerColumn;
    };
    
    return AnswerMatchingQ;
    
    
    
}]);