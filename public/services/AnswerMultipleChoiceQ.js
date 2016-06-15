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

angular.module('QuizSolver').factory('AnswerMultipleChoiceQ',['AnswerQuestion',function(AnswerQuestion){
    
    function AnswerMultipleChoiceQ(question){
        AnswerQuestion.call(this,question);
        this.givenAnswer = []; //bool[]
    };
    
    AnswerMultipleChoiceQ.prototype = AnswerQuestion.prototype;
    
    AnswerMultipleChoiceQ.prototype.check = function(){
        
    };
    
    AnswerMultipleChoiceQ.prototype.addAnswer = function(ans){
        this.givenAnswer.push(ans);
    };
    
    AnswerMultipleChoiceQ.prototype.getGivenAnswer = function(){
      return this.givenAnswer;  
    };
    
    
    
    return AnswerMultipleChoiceQ;
    
    
}]);