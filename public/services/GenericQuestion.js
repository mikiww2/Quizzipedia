/*
 * Nome del file: GenericQuestion.js
 * Percorso: public/services/GenericQuestion.js
 * Autore: Vault-Tech
 * Data creazione:
 * E-mail: vaulttech.swe@gmail.com
 *
 *  Service per la domanda generica
 *
 * * Diario delle modifiche:
 *
 */

angular.module('CreateQuestion').factory('GenericQuestion',['Attachment',function(Attachment){
    
    function GenericQuestion(){
      
        this.author = null; // Teacher
        this.title = null; //String
        this.description = null; //String
        this.topic = null, //String
        this.difficulty = null; //int
        this.questionAttachement = new Attachment(); //String
        this.keywords = []; //String[]
        
        
    };
    
    GenericQuestion.prototype.setAuthor = function(mail_author){
       this.author = mail_author;  
    };
    
    GenericQuestion.prototype.setTitle = function(newTitle){
        this.title = newTitle;
    };    
    
    GenericQuestion.prototype.setDescription = function(newDescription){
        this.description = newDescription;
    };
    
    GenericQuestion.prototype.setTopic = function(newTopic){
        this.topic = newTopic;
    };
    
    GenericQuestion.prototype.setDifficulty = function(newDifficulty){
        this.difficulty = newDifficulty;
    };
    
    GenericQuestion.prototype.setQuestionAttachment = function(newAttachment){
        
        if(newAttachment instanceof Attachment){
            this.questionAttachement = newAttachment;    
        }
        
        
    };
    
    GenericQuestion.prototype.setKeyword = function(newArrayKeyword){
        this.keywords = newArrayKeyword;
    };    
    
    
    
    return GenericQuestion;
    
    
    
}]);