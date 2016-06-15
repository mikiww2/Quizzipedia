/*
 * Nome del file: AnswerMatchingQ.js
 * Percorso: public/services/AnswerMatchingQ.js
 * Autore: Vault-Tech
 * Data creazione:
 * E-mail: vaulttech.swe@gmail.com
 *
 *  Service per la domanda di tipo collegamenti
 *
 * * Diario delle modifiche:
 *
 */

angular.module('QuizSolver').factory('AnswerMatchingQ',['AnswerQuestion','AnswerMatchingQElement',function(AnswerQuestion,AnswerMatchingQElement){
    
    function AnswerMatchingQ(question){
        
        AnswerQuestion.call(this,question);
        this.givenAnswer = []; //array di AnswerMatchingQElement 
        
    };
    
    AnswerMatchingQ.prototype = AnswerQuestion.prototype;
    
    
    AnswerMatchingQ.prototype.check = function(){
        /*
        prendo la prima answer e leggo l'id, adesso vado a cercare nell'array delle risposte di question
        la risposta con quell'id e infine controllo se la risp che c'è in answer è uguale a quella che c'è 
        nell'answer di question
        
        */
        
        console.log("CHECK MATCHING");
    };
    
    AnswerMatchingQ.prototype.setGivenAnswerColumn = function(answer){ //answer:AnswerColumn
    
        this.givenAnswerColumn = answer;
    };
    
    AnswerMatchingQ.prototype.getGivenAnswerColumn = function(){
      
        return this.givenAnswerColumn;
    };
    
    return AnswerMatchingQ;
    
    
    
}]);