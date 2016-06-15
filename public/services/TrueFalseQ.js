/*
 * Nome del file: TrueFalseQ.js
 * Percorso: public/services/TrueFalseQ.js
 * Autore: Vault-Tech
 * Data creazione:
 * E-mail: vaulttech.swe@gmail.com
 *
 *  Service per la domanda di tipo vero o falso (risposta)
 *
 * * Diario delle modifiche:
 *
 */

angular.module('CreateQuestion').factory('TrueFalseQ',['GenericQuestion',function(GenericQuestion){
    
    function TrueFalseQ(){
       GenericQuestion.call(this);
        this.correctAnswer = null; //bool       
    };
    
    TrueFalseQ.prototype = GenericQuestion.prototype;
    
    TrueFalseQ.prototype.setCorrectAnswer = function(answer){ //answer:bool
        this.correctAnswer = answer;
    };
    
    TrueFalseQ.prototype.createAnswerQuestion = function(answer){ //answer:bool    
        
    };
    
    
    
    
    return TrueFalseQ;
    
}]);