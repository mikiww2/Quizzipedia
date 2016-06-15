/*
 * Nome del file: AnswerMatchingElement.js
 * Percorso: public/services/AnswerMatchingElement.js
 * Autore: Vault-Tech
 * Data creazione:
 * E-mail: vaulttech.swe@gmail.com
 *
 *  Service per la domanda di tipo collegamenti (rappresenta un elemento da collegare)
 *
 * * Diario delle modifiche:
 *
 */

angular.module('CreateQuestion').factory('AnswerMatchingElement',['Attachment',function(Attachment){
    
    function AnswerMatchingElement(){
        
        this.id = null;
        this.txt = null;
        this.attachment = null;
    };
    
    
    AnswerMatchingElement.prototype.getId = function(){
      
        return this.id;
    };
    
    AnswerMatchingElement.prototype.getTxt = function(){
      
        return this.txt;
    };
    
    AnswerMatchingElement.prototype.getAttachment = function(){
      
        return this.attachment;
    };
    
    AnswerMatchingElement.prototype.setEmptyAttachment = function(){
      
        this.attachment = new Attachment();
    };
    
    AnswerMatchingElement.prototype.setId = function(id){
        this.id = id;
    };
    
    
    AnswerMatchingElement.prototype.setTxt = function(txt){
        this.txt = txt;
    };
    
    AnswerMatchingElement.prototype.setNameAttachment = function(path){
        this.attachment.setPath(path);
    };
    
    AnswerMatchingElement.prototype.setTypeAttachment = function(type){
        this.attachment.setType(type);
    };
    
    
    return AnswerMatchingElement;
    
}]);