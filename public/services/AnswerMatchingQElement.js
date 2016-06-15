/*
 * Nome del file: AnswerMatchingQElement.js
 * Percorso: public/services/AnswerMatchingQElement.js
 * Autore: Vault-Tech
 * Data creazione:
 * E-mail: vaulttech.swe@gmail.com
 *
 *  Service per la domanda di tipo collegamenti
 *
 * * Diario delle modifiche:
 *
 */

angular.module('QuizSolver').factory('AnswerMatchingQElement',[function(){
    
    function AnswerMatchingQElement(){
        this.id = null;
        this.valueAnswer = null;
        //this.valuAnswerAttachment = null;
    };
    
    AnswerMatchingQElement.prototype.setId = function(id){
        this.id = id;
    };
    
    AnswerMatchingQElement.prototype.setAnswer = function(value){
        console.log("SETANSWER DI MATCHINGQE");
        this.valueAnswer = value;
    };
    
    /*AnswerMatchingQElement.prototype.setValueAnswerAttachment = function(value){
      this.valuAnswerAttachment = value;  
    };
    */
    return AnswerMatchingQElement;
    
    
}]);