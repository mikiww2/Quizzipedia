/*
 * Nome del file: Topics.js
 * Percorso: public/services/Topics.js
 * Autore: Vault-Tech
 * Data creazione:
 * E-mail: vaulttech.swe@gmail.com
 *
 *  Service per gli argomenti
 *
 * * Diario delle modifiche:
 *
 */

angular.module('TopicsManager').factory('Topics',[function(){
    
    function Topics(){
      
        this.topics = [];
        
    };
    
    Topics.prototype.addTopic = function(nameTopic){
        
        this.topics.push(nameTopic);
    };
    
    Topics.prototype.removeTopic = function(indexTopic){
      
        if(indexTopic>=0 && indexTopic<this.topics.length){
            
            this.topics.splice(indexTopic,1);
        }
        
    };
    
    return Topics;
    
    
}]);