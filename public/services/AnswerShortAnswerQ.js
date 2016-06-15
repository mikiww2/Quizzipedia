/*
 * Nome del file: AnswerShortAnswerQ.js
 * Percorso: public/services/AnswerShortAnswerQ.js
 * Autore: Vault-Tech
 * Data creazione:
 * E-mail: vaulttech.swe@gmail.com
 *
 *  Service per la domanda di tipo risposta aperta
 *
 * * Diario delle modifiche:
 *
 */

angular.module().factory('AnswerShortAnswerQ',['AnswerQuestion',function(AnswerQuestion){
    
    function AnswerShortAnswerQ(solver,question,answer){
      
        AnswerQuestion.call(this,solver,question);
        this.givenAnswer = answer; //String
    };
    
    AnswerShortAnswerQ.prototype = AnswerQuestion.prototype;
    
    AnswerShortAnswerQ.prototype.check = function(){
        
    };
    
    AnswerShortAnswerQ.prototype.getGivenAnswer = function(){
      return this.givenAnswer;  
    };
    
    
    
    return AnswerShortAnswerQ;
    
    
    
}]);