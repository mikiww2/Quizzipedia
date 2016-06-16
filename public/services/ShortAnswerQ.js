/*
 * Nome del file: ShortAnsweQ.js
 * Percorso: public/services/ShortAnsweQ.js
 * Autore: Vault-Tech
 * Data creazione:
 * E-mail: vaulttech.swe@gmail.com
 *
 *  Service per la domanda di tipo risposta aperta
 *
 * * Diario delle modifiche:
 *
 */

angular.module('CreateQuestion').factory('ShortAnswerQ',['GenericQuestion',function(GenericQuestion){
    
    function ShortAnswer(){
        GenericQuestion.call(this);
        this.correctAnswer = null; //String
        
    };
    
    ShortAnswer.prototype = GenericQuestion.prototype;
    
    
    
    ShortAnswer.prototype.setCorrectAnswer = function(newCorrectAnswer){
        this.correctAnswer = newCorrectAnswer;
    };
    
    return ShortAnswer;
    
    
}]);