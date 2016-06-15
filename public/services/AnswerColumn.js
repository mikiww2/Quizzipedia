/*
 * Nome del file: AnswerColumn.js
 * Percorso: public/services/AnswerColumn.js
 * Autore: Vault-Tech
 * Data creazione:
 * E-mail: vaulttech.swe@gmail.com
 *
 *  Service per la la colonna delle risposte
 *
 * * Diario delle modifiche:
 *
 */

angular.module().factory('AnswerColumn',[function(){
    
    function AnswerColumn(){
      
        this.givenAnswerCell = []; //int[]
        
    };
    
    
    AnswerColumn.prototype.setGivenAnswerCell = function(answer){ //int[]
      this.givenAnswerCell = answer;  
    };
    
    AnswerColumn.prototype.getGivenAnswerCell = function(){
      return this.givenAnswerCell;  
    };
    
    
    
    AnswerColumn.prototype.check = function(){
      
        
        
    };
    
    return AnswerColumn;
    
}]);