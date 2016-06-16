/*
 * Nome del file: AnswerQuestion.js
 * Percorso: public/services/AnswerQuestion.js
 * Autore: Vault-Tech
 * Data creazione:
 * E-mail: vaulttech.swe@gmail.com
 *
 *  Service per la risposta di una domanda
 *
 * * Diario delle modifiche:
 *
 */

angular.module('QuizSolver').factory('AnswerQuestion',[function(){
    
    function AnswerQuestion(question){        
        this.question = question; //GenericQuestion 
        this.isCorrect = null;
        
    };   
    
    AnswerQuestion.prototype.getQuestion = function(){
      return this.question;  
    };
    
    AnswerQuestion.prototype.setCorrect = function(value){
      this.isCorrect = value;  
    };
    
    AnswerQuestion.prototype.check = function(){
      //metodo astratto ritorna bool
        
    };
    
    
    return AnswerQuestion;
    
    
    
}]);