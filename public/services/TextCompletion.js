/*
 * Nome del file: TextCompletation.js
 * Percorso: public/services/TextCompletation.js
 * Autore: Vault-Tech
 * Data creazione:
 * E-mail: vaulttech.swe@gmail.com
 *
 *  Service per la domanda di tipo completamento testo (testo della domanda)
 *
 * * Diario delle modifiche:
 *
 */

angular.module('CreateQuestion').factory('TextCompletion',[function(){
    
    function TextCompletion(){
      
        this.type = null; //'txt/id'
        this.value = null; //testo domanda --> type = txt 
                           //id buco --> type = id
        
    };
    
    TextCompletion.prototype.getType = function(){
      return this.type;  
    };
    
    TextCompletion.prototype.getValue = function(){
      return this.value;  
    };
    
    TextCompletion.prototype.setType = function(type){
      this.type = type;  
    };
    
    TextCompletion.prototype.setValue = function(value){
        
        this.value = value;
    };
    
    
    
    return TextCompletion;
    
    
}]);