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

angular.module('QuizSolver').factory('AnswerShortAnswerQ',['AnswerQuestion',function(AnswerQuestion){
    
    function AnswerShortAnswerQ(question,answer){
      
        AnswerQuestion.call(this,question);
        this.givenAnswer = answer; //String
    };
    
    AnswerShortAnswerQ.prototype = AnswerQuestion.prototype;
    
    AnswerShortAnswerQ.prototype.check = function(){
        console.log("CHECK SHORTANSWER");
    };
    
    AnswerShortAnswerQ.prototype.getGivenAnswer = function(){
      return this.givenAnswer;  
    };
    
    
    
    return AnswerShortAnswerQ;
    
    
    
}]);