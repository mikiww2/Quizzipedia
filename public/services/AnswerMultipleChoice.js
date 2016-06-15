angular.module('CreateQuestion').factory('AnswerMultipleChoice',['Attachment',function(Attachment){
    
    
    function AnswerMultipleChoice(){
        this.textAnswer = null; //se è null vuol dire che è una risposta che ha solo l'allegato
        this.isTrue = false;
        this.attachment = null; //se è null vuol dire che è una risposta testuale
                                //tipo di attachemnt: Attachment
        
    };
    
    
    AnswerMultipleChoice.prototype.getTextAnswer = function(){
      return this.textAnswer;  
    };
    
    AnswerMultipleChoice.prototype.getIsTrue = function(){
      return this.isTrue;  
    };
    
    AnswerMultipleChoice.prototype.getAttachment = function(){
      return this.attachment;  
    };
    
    AnswerMultipleChoice.prototype.setEmptyAttachment = function(){
        this.attachment = new Attachment();
    };
    
    AnswerMultipleChoice.prototype.setAttachmentType = function(type){
        this.attachment.setType(type);
    };
    
    AnswerMultipleChoice.prototype.setAttachmentPath = function(path){
        this.attachment.setPath(path);  
    };
    
    AnswerMultipleChoice.prototype.setAttachmentCoordinateX = function(x_coordinate){
        this.attachment.setX(x_coordinate);  
    };
    
    
    AnswerMultipleChoice.prototype.setAttachmentCoordinateY = function(y_coordinate){
        this.attachment.setY(y_coordinate);  
    };
    
    
    
    
    
    return AnswerMultipleChoice;
    
}]);