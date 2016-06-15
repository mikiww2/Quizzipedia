/*
 * Nome del file: Attachment.js
 * Percorso: public/services/Attachment.js
 * Autore: Vault-Tech
 * Data creazione:
 * E-mail: vaulttech.swe@gmail.com
 *
 *  Service per un allegato
 *
 * * Diario delle modifiche:
 *
 */

angular.module('CreateQuestion').factory('Attachment',function(){
    
    function Attachment(){
        this.type = null; // img/aud/vid
        this.path = ""; //path dell'allegato
        this.x = null; //ascissa
        this.y = null; //ordinata
    };
    
    
    Attachment.prototype.getType = function(){
      return this.type;  
    };
    
    Attachment.prototype.getPath = function(){
      return this.path;  
    };
    
    Attachment.prototype.getX = function(){
      return this.x;  
    };
    
    Attachment.prototype.getY = function(){
      return this.y;  
    };
    
    Attachment.prototype.setType = function(type){
      this.type = type;  
    };
    
    Attachment.prototype.setPath = function(path){
      this.path = path;  
    };
    
    Attachment.prototype.setX = function(x_coordinate){
      this.x = x_coordinate;  
    };
    
    Attachment.prototype.setY = function(y_coordinate){
      this.y = y_coordinate;  
    };
    
    
    
    
    return Attachment;
    
    
});