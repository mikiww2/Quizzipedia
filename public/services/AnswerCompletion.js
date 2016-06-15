/*
 * Nome del file: AnswerCompletation.js
 * Percorso: public/services/AnswerCompletation.js
 * Autore: Vault-Tech
 * Data creazione:
 * E-mail: vaulttech.swe@gmail.com
 *
 *  Service per la domanda di tipo completamento (risposte)
 *
 * * Diario delle modifiche:
 *
 */

angular.module('CreateQuestion').factory('AnswerCompletion',[function(){
    
    
    function AnswerCompletion(){
      
        this.text = null; //testo risposta
        this.id = null; //id del buco corretto
        
    };
    
    
    
    AnswerCompletion.prototype.getText = function(){
       return this.text;  
    };
    
    AnswerCompletion.prototype.getId = function(){
        return this.id;
    };
    
    AnswerCompletion.prototype.setText = function(text){
        this.text = text;  
    };
    
    AnswerCompletion.prototype.setId = function(id){
        this.id = id;  
    };
    
    
    return AnswerCompletion;
    
}]);