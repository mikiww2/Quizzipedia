/*
 * Nome del file: AnswerMultipleChoiceQ.js
 * Percorso: public/services/AnswerMultipleChoiceQ.js
 * Autore: Vault-Tech
 * Data creazione:
 * E-mail: vaulttech.swe@gmail.com
 *
 *  Service per la domanda di tipo riposta multipla
 *
 * * Diario delle modifiche:
 *
 */

angular.module().factory('AnswerMultipleChoiceQ',['AnswerQuestion',function(AnswerQuestion){
    
    function AnswerMultipleChoiceQ(solver,question,answer){
        AnswerQuestion.call(this,solver,question);
        this.givenAnswer = answer; //bool[]
    };
    
    AnswerMultipleChoiceQ.prototype = AnswerQuestion.prototype;
    
    AnswerMultipleChoiceQ.prototype.check = function(){
        
    };
    
    AnswerMultipleChoiceQ.prototype.getGivenAnswer = function(){
      return this.givenAnswer;  
    };
    
    
    
    return AnswerMultipleChoiceQ;
    
    
}]);